// Proteção de acesso compartilhada por todas as páginas do site.
import { supabase } from './supabase-client.js';

export async function getSessaoEPerfil() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return { session: null, perfil: null };
  const { data: perfil } = await supabase
    .from('perfis')
    .select('nome, papel, ativo, deve_trocar_senha')
    .eq('id', session.user.id)
    .single();
  return { session, perfil };
}

// Chame no topo de qualquer página protegida.
// exigirAdmin: true bloqueia quem não for admin.
export async function exigirLogin({ exigirAdmin = false, redirecionarPara = '/' } = {}) {
  const { session, perfil } = await getSessaoEPerfil();

  if (!session) {
    window.location.href = redirecionarPara;
    return null;
  }
  if (!perfil || perfil.ativo === false) {
    await supabase.auth.signOut();
    alert('Sua conta está desativada. Fale com um administrador.');
    window.location.href = redirecionarPara;
    return null;
  }
  if (exigirAdmin && perfil.papel !== 'admin') {
    alert('Esta página é restrita a administradores.');
    window.location.href = redirecionarPara;
    return null;
  }
  return { session, perfil };
}
