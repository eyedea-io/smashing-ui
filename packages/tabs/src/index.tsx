import * as React from 'react'
import {useDefaults} from '@smashing/theme'
import {Strong} from '@smashing/typography'
import * as S from './styles'
import {TabListProps, TabProps, TabsAppearanceType} from './types'

// TODO: add icon component
const ArrowIcon = () => (
  <svg
    width="16"
    height="10"
    viewBox="0 0 16 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.310946 0.808831C0.725541 0.397056 1.39773 0.397056 1.81233 0.808831L8 6.95442L14.1877 0.808831C14.6023 0.397056 15.2745 0.397056 15.6891 0.808831C16.1036 1.22061 16.1036 1.88823 15.6891 2.3L8.75069 9.19117C8.5516 9.38891 8.28156 9.5 8 9.5C7.71844 9.5 7.44841 9.38891 7.24931 9.19117L0.310946 2.3C-0.103649 1.88823 -0.103649 1.22061 0.310946 0.808831Z"
      fill="#1D304E"
    />
  </svg>
)

export const Tablist: React.FC<TabListProps> = ({
  children,
  closeOnSelect,
  invalid,
  ...props
}) => {
  const defaults = useDefaults('tablist', props, {
    appearance: 'default' as TabsAppearanceType
  })
  const [tabsNumber, setTabsNumber] = React.useState(0)
  const [isOpen, setIsOpen] = React.useState(false)
  const haveMoreButton = defaults.appearance === 'outline'
  const listNode = React.useRef<HTMLUListElement>(null)
  const moreButtonNode = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (listNode && listNode.current && !tabsNumber) {
      const {clientWidth, children: listChildren} = listNode.current
      let widthSum = moreButtonNode.current
        ? moreButtonNode.current.clientWidth
        : 0
      let childCount = 0

      Array.from(listChildren).forEach(child => {
        if (widthSum + child.scrollWidth <= clientWidth) {
          widthSum += child.scrollWidth
          childCount++
        }
      })
      setTabsNumber(childCount)
    }
  }, [listNode])

  const appearanceWithMoreButton = props.appearance === 'outline'
  const handleClick = (e: React.MouseEvent) => {
    if (closeOnSelect) {
      const moreButton = moreButtonNode.current
      if (!moreButton || !moreButton.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
  }
  return (
    <div style={{visibility: tabsNumber ? 'visible' : 'hidden'}}>
      <S.TabList
        onClick={handleClick}
        isOpen={isOpen}
        visibleItemsCount={tabsNumber}
        invalid={invalid}
        ref={listNode}
        {...props}
        {...defaults}
        role="tablist"
      >
        {children}
        {(haveMoreButton || tabsNumber) && appearanceWithMoreButton && (
          <S.MoreButtonContainer invalid={invalid} isOpen={isOpen}>
            <S.MoreButton
              isOpen={isOpen}
              onClick={() => !props.disabled && setIsOpen(!isOpen)}
              ref={moreButtonNode}
            >
              <ArrowIcon />
            </S.MoreButton>
          </S.MoreButtonContainer>
        )}
      </S.TabList>
    </div>
  )
}

export const Tab: React.FC<TabProps> = ({invalid, children, ...props}) => {
  const defaults = useDefaults('tab', props, {
    appearance: 'default' as TabsAppearanceType,
    isSelected: false
  })
  return (
    <S.Tab invalid={invalid} {...props} {...defaults} role="tabpanel">
      <Strong>{children}</Strong>
    </S.Tab>
  )
}

declare module 'styled-components' {
  export interface SmashingTabsDefaults
    extends Partial<{
      tab?: {
        appearance?: TabsAppearanceType
        isSelected: boolean
      }
      tablist?: {
        appearance?: TabsAppearanceType
      }
    }> {}
}
