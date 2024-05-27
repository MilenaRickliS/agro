import "./style.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import React from "react";
import { Link } from "react-router-dom";

// Importando as imagens
import img1 from "../../assets/noticia1.png";
import img2 from "../../assets/noticia2.png";

function Noticias() {
  return (
    <div>
      <Header />

      <main id="main" className="flexbox-col">
        <div className="container">
          <div className="post">
            <h2>FAPA realiza Giro Técnico de Cultivos Outonais</h2>
            <p className="date">20 de Maio de 2024</p>
            <img src={img1} alt="Imagem do Post"></img>
            <p>
              Na última sexta-feira, 17, a FAPA – Fundação Agrária de Pesquisa Agropecuária promoveu o Giro Técnico de Cultivos Outonais. Essa é a terceira vez que a Fundação realiza o evento em um formato onde os cooperados recebem orientações dos pesquisadores e de fornecedores, enquanto visitam as parcelas de experimentos conduzidos pela equipe interna.
              <br />
              <br />
              De acordo com o pesquisador Juliano Luiz de Almeida, coordenador do evento, o plantio no período de intervalo entre as safras de verão e inverno é importante por vários motivos, entre eles a proteção do solo. “Os cultivos outonais representam uma questão de sustentabilidade. Entre a colheita do verão e o início do plantio do inverno as áreas podem ficar de 90 a 120 dias descobertas. Ao trabalhar com os cultivos outonais, colocamos mais matéria seca no solo, o que ajuda a evitar a erosão. Essa camada também protege contra plantas daninhas”, explicou.
            </p>
            <Link to="https://www.agraria.com.br/noticia/4903/fapa-realiza-giro-tecnico-de-cultivos-outonais" className="read-more">Ver a matéria completa</Link>
          </div>
          <div className="post">
            <h2>Agrária é certificada pela Receita Federal como OEA-S</h2>
            <p className="date">14 de Maio de 2024</p>
            <img src={img2} alt="Imagem do Post"></img>
            <p>
              Recentemente, a Agrária recebeu a certificação de Operador Econômico Autorizado (OEA) na categoria S, referente a procedimentos de Segurança em importação e exportação de cargas. Desde 2021, a Cooperativa já contava com a certificação OEA-C, por atender aos requisitos relacionados à Conformidade. A certificação OEA é concedida pela Receita Federal Brasileira e tem validade internacional.
              <br />
              <br />
              A função do certificado é reconhecer empresas de diferentes setores como parceiras da Receita Federal. Com a certificação, as organizações passam a ter benefícios, que se revertem em diminuição da burocracia e agilidade nos processos aduaneiros. Isso acontece porque o certificado OEA funciona como um atestado sobre a confiabilidade das ações executadas pelas empresas. “A certificação OEA-S da Agrária, como importadora e exportadora, é altamente benéfica para nossas atividades aduaneiras. Essa certificação é um reconhecimento oficial de que nossa empresa cumpre com rigorosos padrões de segurança e conformidade, estabelecendo-nos como um parceiro confiável para os órgãos aduaneiros, fiscais e, também, para nossos clientes”, destaca Guilherme Mattes, coordenador de Logística da Cooperativa.
            </p>
            <Link to="https://www.agraria.com.br/noticia/4902/agraria-e-certificada-pela-receita-federal-como-oea-s" className="read-more">Ver a matéria completa</Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Noticias;
