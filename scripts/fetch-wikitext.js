const fs = require('fs');
const https = require('https');

const API = "https://onepiece.fandom.com/pt/api.php";
const PAGE = "Linha_do_Tempo_do_Mundo";

const url = `${API}?action=query&format=json&formatversion=2&prop=revisions&rvprop=content&rvslots=main&titles=${encodeURIComponent(PAGE)}`;

console.log('📥 Baixando wikitext da timeline...');

https.get(url, { headers: { 'User-Agent': 'onepiece-timeline-json/1.0' } }, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      const page = json?.query?.pages?.[0];
      const text = page?.revisions?.[0]?.slots?.main?.content;
      
      if (!text) {
        console.error('❌ Não achei wikitext na resposta');
        process.exit(1);
      }
      
      fs.writeFileSync('wikitext-debug.txt', text, 'utf-8');
      console.log('✅ Wikitext salvo em wikitext-debug.txt');
      console.log(`📊 Tamanho: ${text.length} caracteres`);
      
      const lines = text.split('\n');
      console.log(`📄 Linhas: ${lines.length}`);
      
      console.log('\n🔍 Primeiras 50 linhas para análise:');
      console.log('='.repeat(80));
      lines.slice(0, 50).forEach((line, i) => {
        console.log(`${String(i + 1).padStart(3, ' ')}: ${line}`);
      });
      
    } catch (err) {
      console.error('❌ Erro ao processar resposta:', err);
      process.exit(1);
    }
  });
}).on('error', (err) => {
  console.error('❌ Erro na requisição:', err);
  process.exit(1);
});
