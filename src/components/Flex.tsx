import styled from 'styled-components'

const Flex = styled.div<any>`
  display: ${props => (props.inline ? 'inline-flex' : 'flex')};
  flex-direction: ${props => {
    if (props.columnReverse) return 'column-reverse'
    if (props.rowReverse) return 'row-reverse'
    if (props.column) return 'column'
    return 'row'
  }};
  flex-wrap: ${props => {
    if (props.wrapReverse) return 'wrap-reverse'
    else if (props.wrap === 'wrap') return 'wrap'
    return 'nowrap'
  }};
  justify-content: ${props => {
    if (props.justifyContent) return props.justifyContent
    if (props.justifyCenter) return 'center'
    else if (props.justifyAround) return 'space-around'
    else if (props.justifyBetween) return 'space-between'
    else if (props.justifyEnd) return 'flex-end'
    return 'flex-start'
  }};
  align-items: ${props => {
    if (props.alignItems) return props.alignItems
    else if (props.alignStretch) return 'stretch'
    else if (props.alignEnd) return 'flex-end'
    if (props.alignCenter) return 'center'
    else if (props.alignBaseline) return 'baseline'
    return 'flex-start'
  }};
  align-content: ${props => {
    if (props.alignContent) return props.content
    else if (props.contentStart) return 'flex-start'
    else if (props.contentEnd) return 'flex-end'
    else if (props.contentCenter) return 'center'
    else if (props.contentBetween) return 'space-between'
    else if (props.contentAround) return 'contentAround'
    return 'stretch'
  }};
`

export default Flex
