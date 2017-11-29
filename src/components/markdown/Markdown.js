import React from 'react';
import classNames from 'classnames';
import ReactMarkdown from 'react-markdown';
import Icon from 'components/icon';

const ALLOWED_IMAGE_VARIANTS = ['left', 'right', 'block', 'blockLeft', 'blockRight'];
const RENDERERS = {
  Link: ({children, href, title}) => <a className='Markdown-link' children={children} href={href} title={title} target="_blank"/>,
  Image,
  Paragraph: ({children}) => <div className="Markdown-paragraph">{children}</div>,
  Emph,
  Strong: ({children}) => <strong className="Markdown-bold">{children}</strong>,
  List: ({children, type}) => {
    let ordered = type === 'Ordered';
    let List = ordered ? 'ol' : 'ul';
    return <List className={classNames('Markdown-list', {'Markdown-list--ordered': ordered, 'Markdown-list--unordered': !ordered})}>{children}</List>
  },
  Item: ({children}) => <li className='Markdown-listItem'>{children}</li>,
  BlockQuote: ({children}) => (
    <blockquote className='Markdown-blockQuote'>
      <Icon type='quote' className='Markdown-blockQuoteIcon' interactive={false}/>
      <div className="Markdown-blockQuoteContent">
        {children}
      </div>
      <Icon type='quote' className='Markdown-blockQuoteIcon Markdown-blockQuoteIcon--close' close interactive={false}/>
    </blockquote>
  ),
  Heading: ({level, children}) => {
    let Heading = `h${level}`;
    return <Heading className={classNames('Markdown-heading', `Markdown-heading--${level}`)}>{children}</Heading>;
  }
};

function Image({alt, src, title}) {
  let matches = src.match(/#([^?]+)(?:\?|$)/);
  let variant = matches && ALLOWED_IMAGE_VARIANTS.includes(matches[1]) && matches[1];
  return (
    <div
      className={classNames(
        'Markdown-image',
        {[`Markdown-image--${variant}`]: variant}
      )}
    >
      <img className='Markdown-img' src={src} alt={alt} title={title}/>
    </div>
  );
}

function Emph ({children}) {
  let match = typeof children[0] === 'string' && /^\[([^\]]+)\]/g.exec(children[0]);
  let variant = (match && match[1]) || 'italic';
  children = [ children[0].replace(/^\[.+\]/, ''), ...children.slice(1)];
  return <em className={`Markdown-emph Markdown-emph--${variant}`}>{children}</em>;
}

export default function Markdown ({content, className}) {
  return (
    <ReactMarkdown
      className={classNames('Markdown', className)}
      source={content || ''}
      renderers={RENDERERS}
      allowedTypes={[
        //'HtmlInline',
        //'HtmlBlock',
        'Text',
        'Paragraph',
        'Heading',
        'Softbreak',
        //'Hardbreak',
        'Link',
        'Image',
        'Emph',
        //'Code',
        //'CodeBlock',
        'BlockQuote',
        'List',
        'Item',
        'Strong',
        //'ThematicBreak'
      ]}
    />
  );
}
