// Ajuda a registrar ações no log de auditoria a partir de qualquer página/módulo.
import { supabase } from './supabase-client.js';

export async function registrarAcao(acao, entidade = null, entidadeId = null, detalhes = {}) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return;
  try {
    await supabase.from('log_acoes').insert({
      usuario_id: session.user.id,
      usuario_email: session.user.email,
      acao,
      entidade,
      entidade_id: entidadeId != null ? String(entidadeId) : null,
      detalhes,
    });
  } catch (e) {
    console.warn('Não foi possível registrar o log:', e);
  }
}
