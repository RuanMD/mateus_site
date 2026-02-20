#!/bin/bash

echo "Adicionando arquivos modificados..."
git add .

echo "Criando o commit..."
# Pega o primeiro argumento passado para o script como mensagem de commit, ou usa a padrão
COMMIT_MSG=${1:-"chore: remove créditos do desenvolvedor do rodapé e outras modificações"}
git commit -m "$COMMIT_MSG"

echo "Enviando alterações para o GitHub..."
git push

echo "Pronto! Alterações enviadas com sucesso."
