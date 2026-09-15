// Configuração central do Supabase para todo o site.
// A chave abaixo é a chave PÚBLICA (anon/publishable) — ela é segura para ficar
// no navegador porque todo o acesso real é controlado por Row Level Security (RLS)
// no banco de dados. Nunca coloque a "service role key" aqui.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

export const SUPABASE_URL = 'https://ojxytukwesxssencojzj.supabase.co';
export const SUPABASE_ANON_KEY = 'sb_publishable_Evnjah3KwbpwHOSUfWcOwg_WBIn3rEH';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
