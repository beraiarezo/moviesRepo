import React, { FC } from 'react'
import styled from 'styled-components'
import { loadingGif } from 'src/assets'
import Flex from './Flex'
const Wrapper = styled(Flex)`
    position: fixed;
    left: 0;
    top: 64px;
    width: 100%;
    height: calc(100% - 64px);
    display: flex;
    z-index: 999;
    text-align: center;
    background-color: rgba(0, 0, 0, .8);
`
const LoaderIcon = styled.img`
    width: 300px;
`

const Loader: FC = () => {
    return (
        <Wrapper justifyCenter alignCenter>
            <LoaderIcon src={loadingGif} />
        </Wrapper>
    )
}

export default Loader