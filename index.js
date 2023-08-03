require('dotenv').config();
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto('https://eselo.tjba.jus.br/index.faces');

  await page.setViewport({width: 1080, height: 1024});

  // Fechar a caixa (caso necessário)
  const closeBox = await page.$('[title="Fechar janela"]');
  await closeBox.click();

  await page.waitForNavigation();

  
  // Aguardar o seletor estar disponível na página
  await page.waitForSelector('#atribuicoes');

  // Selecionar a opção "ATOS_DOS_OFICIAIS_JUSTICA"
  await page.select('#atribuicoes', 'RI');

  
  // Aguardar o seletor estar disponível na página
  await page.waitForSelector('#tiposatos');

  // Selecionar a opção "VII-CERTIDÕES: B) CERTIDÃO DE INTEIRO TEOR DE MATRÍCULA, COM NEGATIVA OU POSITIVA DE ÔNUS."
  await page.select('#tiposatos', 'VII-CERTIDÕES: B) CERTIDÃO DE INTEIRO TEOR DE MATRÍCULA, COM NEGATIVA OU POSITIVA DE ÔNUS.');

  // Aguardar o seletor estar disponível na página
  await page.waitForSelector('#comarcas');

  // Selecionar a opção "SALVADOR"
  await page.select('#comarcas', 'SALVADOR');

  // Aguardar o seletor estar disponível na página
  await page.waitForSelector('#cartorios');

  // Selecionar a opção "REGISTRO DO 7º OFICIO DE IMÓVEIS - SALVADOR"
  await page.select('#cartorios', 'REGISTRO DO 7º OFICIO DE IMÓVEIS - SALVADOR');

  // Aguardar o seletor estar disponível na página
  await page.waitForSelector('#contribuinte');

  // Preencher o campo nome
  await page.type('#contribuinte', 'João Borges Hegouet Neto');

  // Aguardar o seletor estar disponível na página
  await page.waitForSelector('#endereco_completo');

  // Preencher o campo endereço
  await page.type('#endereco_completo', 'nesta');

  // Aguardar o seletor estar disponível na página
  await page.waitForSelector('#cidade');

  // Preencher o campo cidade
  await page.type('#cidade', 'Ssa');

  // Aguardar o seletor estar disponível na página
  await page.waitForSelector('#maskcpf');

  // Preencher o campo cpf
  await page.type('#maskcpf', '02919559591');


  const buttonEmitir = await page.$('#commandButtonEmitirDaj');

  await buttonEmitir.click()

  await page.waitForTimeout(5000);

// Usar evaluate para clicar no link da imagem do boleto
  await page.evaluate(() => {
    const divImgPrint = document.querySelector('#img_print');
    const linkImprimirDaje = divImgPrint.querySelector('a');
    if (linkImprimirDaje) {
      linkImprimirDaje.click();
    }
  });

  await page.waitForNavigation()

  // ACESSAR essa pagina
  await page.goto('https://eselo.tjba.jus.br/public/emitir_daj/imprimir_daj.faces');

  
  // // Esperar um pouco para ver o resultado
  // await page.waitForTimeout(3000);

  // await browser.close();
})();

