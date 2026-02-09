/**
 * Maps database and system errors to user-friendly Portuguese messages.
 * Prevents information leakage by hiding technical details from users.
 */
export function getErrorMessage(error: unknown): string {
  const message = (error as { message?: string })?.message?.toLowerCase() || '';
  
  // Map database errors to user-friendly messages
  if (message.includes('duplicate key') || message.includes('unique constraint')) {
    if (message.includes('slug')) {
      return 'Já existe um post com este slug. Escolha outro.';
    }
    if (message.includes('email')) {
      return 'Este e-mail já está cadastrado.';
    }
    return 'Este registro já existe.';
  }
  
  if (message.includes('foreign key')) {
    return 'Não é possível excluir este item pois está sendo usado.';
  }
  
  if (message.includes('row-level security') || message.includes('permission denied')) {
    return 'Você não tem permissão para realizar esta ação.';
  }
  
  if (message.includes('not-null constraint') || message.includes('violates not-null')) {
    return 'Alguns campos obrigatórios não foram preenchidos.';
  }
  
  if (message.includes('invalid input syntax')) {
    return 'Dados inválidos fornecidos.';
  }
  
  if (message.includes('jwt') || message.includes('token') || message.includes('session')) {
    return 'Sessão expirada. Faça login novamente.';
  }
  
  if (message.includes('network') || message.includes('fetch')) {
    return 'Erro de conexão. Verifique sua internet e tente novamente.';
  }
  
  if (message.includes('timeout')) {
    return 'A operação demorou muito. Tente novamente.';
  }
  
  // Log full error for debugging (appears only in browser console)
  console.error('Unexpected error:', error);
  
  // Generic fallback
  return 'Ocorreu um erro inesperado. Tente novamente ou entre em contato com o suporte.';
}
