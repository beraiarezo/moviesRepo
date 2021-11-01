import React, { FC } from 'react'
import styled from 'styled-components'
import * as colors from 'src/consts/colors'
import { iconTop } from 'src/assets'


const Title = styled.h3<{textColor: string}>`
  width: 100%;
  color: ${props => props.textColor};
  text-align: center; 
  padding: 20px 0;
`

const Icon = styled.span`
  background-image: url(${iconTop});
  background-color: ${colors.white};
  padding: 10px 10px 10px 50px;
  background-size: 33px;
  background-position: 10px;
  border-radius: 3px;
  background-repeat: no-repeat;
`
const PageTitle: FC<{textColor: string}> = ({ textColor, children }) => {
    return (
        <Title textColor={textColor}>
            <Icon>
                {children}
            </Icon>
        </Title>
    )
}

export default PageTitle