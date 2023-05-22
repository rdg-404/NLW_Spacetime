import { NextRequest, NextResponse } from 'next/server'

const signInUp = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value // verifica se o token é válido

  if (!token) {
    return NextResponse.redirect(signInUp, {
      headers: {
        'Set-Cookie': `redirectTo=${request.url}; Path=/; HttpOnly; max-age=20`, // salva a url acessada original
      },
    })
  }

  return NextResponse.next() // se o token for valido nao faz nenhum redirecionamento
}

export const config = {
  matcher: '/memories/:path*',
}
