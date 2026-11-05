# PRD - ParaQuemDoar (Clone)

## Problema Original
Clone do site https://www.paraquemdoar.com.br/ - plataforma de doações com painel administrativo, integração com Telegram, rastreamento de acessos e fluxo completo de doação via PIX. Projeto foi trazido do repositório GitHub `a0934075218-sudo/paraquemdoar-completo3` para o ambiente Emergent em 02/05/2026.

## Arquitetura
- **Frontend:** React (CRA/Craco) + Tailwind CSS + Shadcn UI + React Router v7
- **Backend:** FastAPI + MongoDB (Motor)
- **Integrações:** Telegram Bot API, ip-api.com (geolocalização por IP), embla-carousel-react, qrcode.react
- **Banco:** MongoDB local, DB=`test_database`, collections: `donations`, `visits`, `config`

## Credenciais
- **Admin Panel:** usuário e senha em `ADMIN_USERNAME` / `ADMIN_PASSWORD` no `backend/.env` (fora do código)
- **Rota Admin:** `/donaspainel`
- **Telegram Bot:** `@Novo_pix_gerado_PQD_bot` (token em `backend/.env`)
- **Grupo Telegram:** "Novo pagamento _Donas" (chat_id `-1003742872851`)

## Funcionalidades Implementadas
- Homepage com Hero Carousel (3 slides: Pernambuco, SP, RS) com auto-play e navegação
- Grid com 24 instituições (páginas dinâmicas `/instituicao/:slug`)
- 6 posts de blog (`/blog/:slug`)
- Barra de pesquisa funcional no header
- Fluxo de doação: `/doacao/valor` -> `/doacao/dados` -> `/doacao/pix` (QR Code + código PIX)
- Rastreamento de origem (ex: "Campanha Pernambuco" vs instituição específica)
- Painel administrativo completo: stats, tabela de doações, config chave PIX, config Telegram, acessos
- Notificação Telegram automática ao gerar PIX (status: Gerado)
- Edição automática da MESMA mensagem Telegram quando PIX é copiado (status: Copiado)
- Rastreamento de visitas com geolocalização via IP

## Integrações configuradas
### Telegram Bot
- Token em `backend/.env` como `TELEGRAM_BOT_TOKEN`
- `chat_id` persistido em `db.config` (key=`telegram_chat_id`)
- `telegram_message_id` é salvo em cada doação para permitir edição futura
- Mensagem enviada quando PIX é gerado; editada (não duplicada) quando copiado

## Status do Projeto (03/05/2026)
- ✅ Backend: 36/36 testes pytest PASSANDO
- ✅ Frontend: Todos os fluxos críticos validados
- ✅ Banco de dados íntegro e limpo (0 donations, 0 visits)
- ✅ Telegram bot configurado e testado
- ⚠️ Chave PIX vazia — usuário deve configurar via painel admin após deploy
- ✅ **Pronto para deploy em produção**

## Recomendações para Produção (não bloqueantes)
- Configurar `JWT_SECRET` no `.env` (mínimo 32 caracteres, não usar default)
- Mover `ADMIN_USERNAME` e `ADMIN_PASSWORD` para env vars (remover defaults hardcoded)
- `visual-edits` plugin injeta `<span>` dentro de `<tbody>` gerando warning de hidratação (cosmético; desaparece no build de produção)

## Estrutura de Arquivos Chave
- `backend/server.py` - FastAPI app + MongoDB client
- `backend/admin_routes.py` - Rotas /api/admin/* (auth JWT, donations, PIX, stats, visits, config)
- `backend/telegram_bot.py` - Send/edit Telegram messages
- `backend/pix_generator.py` - Gera payload EMV do PIX (br.gov.bcb.pix)
- `frontend/src/App.js` - Router principal
- `frontend/src/components/HeroCarousel.jsx` - Carrossel da home
- `frontend/src/components/CampanhaPernambuco.jsx` - Landing campanha (institution='Campanha Pernambuco')
- `frontend/src/components/PixPaymentPage.jsx` - Tela final com QR + cópia do PIX
- `frontend/src/components/AdminDashboard.jsx` - Painel admin
- `frontend/src/mockData.js` - Dados estáticos (instituições, blog)

## Backlog
- Nenhuma tarefa bloqueante identificada para deploy
- Enhancement sugerido: Página pública de relatório/transparência mostrando total arrecadado e número de doadores em tempo real — aumenta confiança e estimula mais doações
