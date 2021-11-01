import React, { FC, useEffect, useRef, useState } from 'react'
import { useAppSelector, useAppDispatch } from 'src/app/hooks';
import { selectFavorites, fetchMovies } from 'src/store/movieSlice'
import { setUi, getUi } from 'src/store/uiSlice'
import styled, { css } from 'styled-components'
import * as colors from 'src/consts/colors'
import { Flex } from 'src/components'
import { logo, iconDownArrow } from 'src/assets'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const Wrapper = styled(Flex)`
  background-color: ${colors.primaryDark};
`
const Header = styled(Flex)`
  width: 100%;
  background-color: ${colors.black};
  position: fixed;
  width: 100%;
  height: 65px;
  z-index: 3;
`
const Logo = styled.img`
  height: 45px;
`
const Container = styled(Flex)<{isTouch: boolean, isSmall: boolean}>`
  width: ${props => props.isTouch ? 95 : 80 }%;
  padding: 10px 0;
`
const ContentContainer = styled(Flex)<{isTouch: boolean, isSmall: boolean}>`
  width: ${props => props.isTouch ? 95 : 80 }%;
  padding: 65px 0;
`

const baseStyles = css<{bgcolor: string, color?: string}>`
  padding: 7px;
  border-radius: 7px;
  background-color: ${props => props.bgcolor};
  color: ${props => props.color ? props.color : colors.white};
  text-decoration: none;
  font-size: 20px;
  transition: all .2s linear;
  &:hover {
    opacity: 0.95;
  }
`
const TopRated = styled(Link)`
  ${baseStyles};
  margin: 0 15px 0 0;
`
const Favorites = styled(Link)`
  ${baseStyles}; 
`

const ScrollToBottom = styled.div`
  position: fixed;
  color: #fff;
  right: 0;
  bottom: 80px;
  background-color: ${colors.secondary};
  width: 35px;
  height: 35px;
  z-index: 99;
  border-radius: 7px 0px 0px 7px;
  background-image: url(${iconDownArrow});
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
`

export const Content: FC = ({children}) => {
    const wrapperRef = useRef<HTMLDivElement>()
    const location = useLocation();

    const [wrapperHeight, setWrapperHeight] = useState(0)
    const favorites = useAppSelector(selectFavorites)
    const ui = useAppSelector(getUi)
    const dispatch = useAppDispatch()

    useEffect(() => {
      checkUi()
      dispatch(fetchMovies(1))
    // eslint-disable-next-line
    }, [])

    useEffect(() => {
      function CheckArrow() {
        setTimeout(() => {
            if(wrapperRef && wrapperRef.current) {
              const { height } = wrapperRef.current.getBoundingClientRect()
              setWrapperHeight(height)
            }
          }, 100)
        }

      CheckArrow()
    }, [location.pathname])

    useEffect(() => {
      function listener() {
        checkUi() 
        
      }
      window.addEventListener('resize', listener)
      // eslint-disable-next-line
    }, [])

    const checkUi = () => {
      dispatch(setUi({ 
        isSmall: window.innerWidth > 860  && window.innerWidth < 1350,
        isTouch: window.innerWidth < 860
      }))
    }

    const scrollTo = (pos: number = 0) => {
      window.scrollTo(0, pos)
    }

    return (
        <Wrapper justifyCenter wrap="wrap" >
          <Header justifyCenter>
            <Container
              isSmall={ui.isSmall}
              isTouch={ui.isTouch} 
              alignCenter 
              justifyBetween>
                <Link to="/">
                  <Logo src={logo} onClick={() => scrollTo()}/>
                </Link>
              <Flex>
                <TopRated to="/" bgcolor={colors.success}>Top Rated</TopRated>
                <Favorites to="/mymovies" bgcolor={colors.primary}>Favorites {favorites.length ? favorites.length : ''}</Favorites>
              </Flex>
            </Container>
            </Header>
            {wrapperHeight > 900 && (
              <ScrollToBottom onClick={() => {
                if(wrapperRef && wrapperRef.current) {
                  const { height } = wrapperRef.current.getBoundingClientRect()
                  scrollTo(height)
                } 
              }}/>
            )}
            <ContentContainer ref={wrapperRef}
              wrap="wrap" 
              justifyBetween
              isSmall={ui.isSmall}
              isTouch={ui.isTouch}>
                {children}
            </ContentContainer>
        </Wrapper>
    )
}

