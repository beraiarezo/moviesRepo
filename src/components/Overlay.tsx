import React, { FC } from 'react'
import styled from 'styled-components'
import * as colors from 'src/consts/colors'

const OverlayEl = styled.div`
    position: fixed;
    left: 0;
    top: 164px;
    width: 100%;
    height: calc(100% - 164px);
    background-color: ${colors.primaryDark};
`
const Overlay: FC = () => <OverlayEl></OverlayEl>

export default Overlay