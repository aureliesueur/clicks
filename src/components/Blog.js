import React from 'react';
import '../styles/Blog.scss';
import '../styles/App.scss';

function Blog() {
  return (
    <div className="blog">
      <h1 className="blog__title">Ça vous intéresse ?</h1>
      <div className="blog__list">
        <div className="blog__article">
          <h2>Photo – Le rétro, 10 ans que ça dure et toujours à la page - Une mode intemporelle ?</h2>
          <h3>Par Céline Nebor - Publié le 14/06/15 à 14h00 </h3>
          <p>Les effets de mode connaissent toujours des pics de popularité gigantesques, puis un beau jour s'essoufflent, retombent et stagnent. C'est à ce moment que l'on commence à entendre l'une des phrases préférées de nos aînés : "C'était mieux avant" ! Et il n'y a pas que les jeans à pattes d'éléphant qui refont surface, puisque la photographie prône encore et toujours le "vintage". Se nourrir des avancées technologiques pour revenir à des choses essentielles et retrouver ce "cachet" d'antan, c'est ce vers quoi tendent certains constructeurs et inventeurs. Mais l'innovation photo "vintage" idéale existe-t-elle réellement ?</p>
          </div>
        </div>
    </div>
  );
}

export default Blog;
