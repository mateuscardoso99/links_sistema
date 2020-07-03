export const getTokenExpire = (token) => {
    // const tokenParts = token.split('.')//o ponto separa cada parte do token(headers, payload, assinatura)
    // const header = tokenParts[0]
    // const payload = tokenParts[1]
    // const signature = tokenParts[2]
    if(!token) return 0
    try{
        const [, payload] = token.split('.')//pegando a posicao [1] apenas
        const data = JSON.parse(atob(payload))// atob converte base64 para string
        const expires = data ? data.exp : 0
        return expires
    }catch(error){
        return 0
    }
}