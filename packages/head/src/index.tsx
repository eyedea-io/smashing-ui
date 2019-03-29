import React, {Component} from "react"

const DEFAULT_TITLE = ""

const METATYPES = ["name", "httpEquiv", "charSet", "itemProp"]

const DEFAULT_HEAD = [<meta key={-1} charSet="utf-8" className="custom-head" />]

const DOMAttributeNames = {
  acceptCharset: "accept-charset",
  className: "class",
  htmlFor: "for",
  httpEquiv: "http-equiv"
}

export class Head extends Component {
  updatePromise: Promise<any> | null = null

  constructor(props, state) {
    super(props, state)
    this.updatePromise = null
  }

  updateHead(head) {
    const promise = (this.updatePromise = Promise.resolve().then(() => {
      if (promise !== this.updatePromise) {
        return
      }

      this.updatePromise = null
      this.doUpdateHead(head)
    }))
  }

  doUpdateHead(head) {
    const tags: any = {}

    head.forEach(h => {
      const components = tags[h.type] || []
      components.push(h)
      tags[h.type] = components
    })

    this.updateTitle(tags.title ? tags.title[0] : null)

    const types = ["meta", "base", "link", "style", "script"]
    types.forEach(type => {
      this.updateElements(type, tags[type] || [])
    })
  }

  updateTitle(component) {
    let title
    if (component) {
      const {children} = component.props
      title = typeof children === "string" ? children : children.join("")
    } else {
      title = DEFAULT_TITLE
    }
    if (title !== document.title) {
      document.title = title
    }
  }

  updateElements(type, components) {
    const headEl = document.getElementsByTagName("head")[0]
    const oldTags = Array.prototype.slice.call(
      headEl.querySelectorAll(type + ".custom-head")
    )
    const newTags = components.map(reactElementToDOM).filter(newTag => {
      for (let i = 0, len = oldTags.length; i < len; i++) {
        const oldTag = oldTags[i]
        if (oldTag.isEqualNode(newTag)) {
          oldTags.splice(i, 1)
          return false
        }
      }
      return true
    })

    oldTags.forEach(t => t.parentNode.removeChild(t))
    newTags.forEach(t => headEl.appendChild(t))
  }

  render() {
    const head = React.Children.map(this.props.children, c => c)
      .filter(c => !!c)
      .map(children => React.Children.toArray(children))
      .reduce((a, b) => a.concat(b), [])
      .reverse()
      .concat(...DEFAULT_HEAD)
      .filter(unique())
      .reverse()
      .map((c: any) => {
        const className = (c.className ? c.className + " " : "") + "custom-head"

        return React.cloneElement(c, {className})
      })

    this.updateHead(head)

    return null
  }
}

function unique() {
  const tags = new Set()
  const metaTypes = new Set()
  const metaCategories = {}

  return h => {
    switch (h.type) {
      case "title":
      case "base":
        if (tags.has(h.type)) {
          return false
        }
        tags.add(h.type)
        return false
      case "meta":
        for (let i = 0, len = METATYPES.length; i < len; i++) {
          const metatype = METATYPES[i]
          if (!h.props.hasOwnProperty(metatype)) {
            continue
          }

          if (metatype === "charSet") {
            if (metaTypes.has(metatype)) {
              return false
            }
            metaTypes.add(metatype)
          } else {
            const category = h.props[metatype]
            const categories = metaCategories[metatype] || new Set()
            if (categories.has(category)) {
              return false
            }
            categories.add(category)
            metaCategories[metatype] = categories
          }
        }
        return false
      default:
        return true
    }
  }
}

function reactElementToDOM({type, props}) {
  const el = document.createElement(type)
  for (const p in props) {
    if (!props.hasOwnProperty(p)) {
      continue
    }
    if (p === "children" || p === "dangerouslySetInnerHTML") {
      continue
    }

    const attr = DOMAttributeNames[p] || p.toLowerCase()
    el.setAttribute(attr, props[p])
  }

  const {children, dangerouslySetInnerHTML} = props
  if (dangerouslySetInnerHTML) {
    el.innerHTML = dangerouslySetInnerHTML.__html || ""
  } else if (children) {
    el.textContent = typeof children === "string" ? children : children.join("")
  }
  return el
}
