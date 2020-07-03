import {connect} from 'react-redux'
import {getToken} from '../../helpers/account'
import {getTokenExpire} from '../../helpers/jwt'
import {secondsToReadableTime} from '../../helpers/datetime'
import {getFreshToken} from '../../actions/AccountActions'
import { useEffect } from 'react'

const TokenRefresher = ({getFreshToken}) => {
    const TRESHOLD = 30

    const calcular = () => {
        const token = getToken()
        const expires = getTokenExpire(token)
        const secondsToExpire = expires - Date.now() / 1000//pegando o tempo de expiração em segundos do token

        return secondsToExpire
    }

    useEffect(()=>{
        const secondsToExpire = calcular() - TRESHOLD
        const readableTime = secondsToReadableTime(secondsToExpire)
        console.log('tempo para expirar o token', readableTime)
        const id = setTimeout(getFreshToken, secondsToExpire * 1000)//30 SEGUNDOS ANTES DO TOKEN EXPIRAR A FUNCAO E CHAMADA
        return () => clearTimeout(id)
    },[getFreshToken])


    return null
}

const mapStateToProps = (state) => {
    return { }
}

export default connect(mapStateToProps, {getFreshToken})(TokenRefresher)