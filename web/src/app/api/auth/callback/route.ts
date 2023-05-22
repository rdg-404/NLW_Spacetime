import { api } from '@/lib/api'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  const redirectTo = request.cookies.get('redirectTo')?.value // pega a url salva la no arquivi middleware

  const registerReponse = await api.post('/register', {
    code,
  })

  const { token } = registerReponse.data

  // console.log(token)

  const redirectURL = redirectTo ?? new URL('/', request.url) // se tiver a informação do redirectTo envia pra pagina se nao envia pra home

  const cookieExpiresInSeconds = 60 * 60 * 24 * 30

  return NextResponse.redirect(redirectURL, {
    headers: {
      'Set-Cookie': `token=${token}; Path=/; max-age=${cookieExpiresInSeconds}`,
    },
  })
}
