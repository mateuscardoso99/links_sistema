export const secondsToReadableTime = (seconds) => {    
    const horas = Math.floor(seconds /60 /60)
    const mins = Math.floor(seconds /60) - horas * 60
    const segundos = seconds % 60
    const formatNumber = v => `0${Number.parseInt(v, 10)}`.slice(-2)
    const readableTime = [horas,mins,segundos].map(formatNumber).join(':')
    return readableTime
}