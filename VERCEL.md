# Evolution API - Vercel Deployment

Este projeto foi configurado para deploy no Vercel como uma API serverless.

## Configuração do Vercel

### Framework Selection
- **NÃO selecione Next.js**
- **NÃO selecione nenhum framework**
- Deixe em branco ou selecione "Other"

### Arquivos de Configuração

- `vercel.json` - Configuração principal do Vercel
- `.vercelignore` - Arquivos ignorados no deploy
- `api/index.js` - Ponto de entrada para serverless functions

### Build Settings no Vercel

Configure manualmente no painel do Vercel:

- **Build Command**: `npm run vercel-build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Variáveis de Ambiente Necessárias

Configure as seguintes variáveis no painel do Vercel:

```bash
# Banco de Dados
DATABASE_PROVIDER=postgresql
DATABASE_CONNECTION_URI=postgresql://user:password@host:port/database

# Autenticação
AUTHENTICATION_API_KEY=your-api-key

# Servidor
SERVER_PORT=3000
SERVER_URL=https://your-app.vercel.app

# Cache (opcional)
CACHE_REDIS_ENABLED=false
CACHE_LOCAL_ENABLED=true

# Logs
LOG_LEVEL=ERROR,WARN,INFO
```

### Build Process

O Vercel executará automaticamente:

1. `npm install` - Instala dependências
2. `npm run vercel-build` - Compila o projeto TypeScript + gera Prisma
3. Deploy da função serverless em `api/index.js`

### Limitações do Vercel

- **Timeout**: Máximo 30 segundos por requisição
- **Memória**: Limite de memória para funções serverless
- **Persistência**: Arquivos temporários não persistem entre execuções
- **WebSocket**: Não suportado nativamente

### Recomendações

Para produção, considere usar:
- **Railway** - Melhor para aplicações Node.js completas
- **Heroku** - Suporte completo a WebSocket e persistência
- **DigitalOcean App Platform** - Alternativa robusta

### Troubleshooting

Se encontrar erros de deploy:

1. Verifique se todas as variáveis de ambiente estão configuradas
2. Confirme que o banco de dados está acessível
3. Verifique os logs de build no painel do Vercel
4. Considere usar uma plataforma mais adequada para aplicações WhatsApp
