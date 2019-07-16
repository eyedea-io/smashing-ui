import * as React from "react"
import{SpiderDataItems} from '../../types'
import * as d3 from "d3"

interface Coordinates {
  x: number
  y: number
}

const useAlgorithm = (data: SpiderDataItems, calculateCoordinates: Function) => {
  const [result, setResult] = React.useState(0)
  React.useEffect(() => {
    let polygonsValues = [] as number[][]
    let coordinates = [] as Coordinates[][]
    let intersection = [] as [number, number][]
    let outerPolygons = [] as [number, number][]
    data.datasets.map(d => {
      polygonsValues.push(d.values)
      coordinates.push(calculateCoordinates(d.values))
    })
    for (let j = 0; j < coordinates[0].length; j++) {
      let c: any

      if (j >= 4) {
        c = lineIntersect(
          coordinates[0][j].x,
          coordinates[0][j].y,
          coordinates[0][0].x,
          coordinates[0][0].y,
          coordinates[1][j].x,
          coordinates[1][j].y,
          coordinates[1][0].x,
          coordinates[1][0].y
        )
      } else {
        c = lineIntersect(
          coordinates[0][j].x,
          coordinates[0][j].y,
          coordinates[0][j + 1].x,
          coordinates[0][j + 1].y,
          coordinates[1][j].x,
          coordinates[1][j].y,
          coordinates[1][j + 1].x,
          coordinates[1][j + 1].y
        )
      }

      if (polygonsValues[0][j] > polygonsValues[1][j]) {
        outerPolygons.push([coordinates[0][j].x, coordinates[0][j].y])
        intersection.push([coordinates[1][j].x, coordinates[1][j].y])
      } else {
        intersection.push([coordinates[0][j].x, coordinates[0][j].y])
        outerPolygons.push([coordinates[1][j].x, coordinates[1][j].y])
      }
      if (c) {
        intersection.push(c)
        outerPolygons.push(c)
      }
    }
    setResult(
      (d3.polygonArea(intersection) / d3.polygonArea(outerPolygons)) * 100
    )
  }, [])

  return result
}

const lineIntersect = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number,
  x4: number,
  y4: number
) => {
  const x =
    ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) /
    ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4))
  const y =
    ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) /
    ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4))
  if (isNaN(x) || isNaN(y)) {
    return false
  }
  if (x1 >= x2) {
    if (!(x2 <= x && x <= x1)) {
      return false
    }
  } else {
    if (!(x1 <= x && x <= x2)) {
      return false
    }
  }
  if (y1 >= y2) {
    if (!(y2 <= y && y <= y1)) {
      return false
    }
  } else {
    if (!(y1 <= y && y <= y2)) {
      return false
    }
  }
  if (x3 >= x4) {
    if (!(x4 <= x && x <= x3)) {
      return false
    }
  } else {
    if (!(x3 <= x && x <= x4)) {
      return false
    }
  }
  if (y3 >= y4) {
    if (!(y4 <= y && y <= y3)) {
      return false
    }
  } else {
    if (!(y3 <= y && y <= y4)) {
      return false
    }
  }

  return [x, y]
}

export default useAlgorithm
