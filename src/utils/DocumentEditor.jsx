import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css';

export default class DocumentEditor extends Component {
  static propTypes = {
    value: PropTypes.string,
    disabled: PropTypes.bool,
    onDocumentChange: PropTypes.func
  };

  isEmpty = () => this.summernote.isEmpty();

  onImageUpload(images, insertImage) {
    /* FileList does not support ordinary array methods */
    for (let i = 0; i < images.length; i += 1) {
      /* Stores as bas64enc string in the text.
       * Should potentially be stored separately and include just the url
       */
      const reader = new FileReader();

      reader.onloadend = () => {
        insertImage(reader.result);
      };

      reader.readAsDataURL(images[i]);
    }
  }

  getToolbar = () => [
    ['estilo', ['style']],
    ['fuente', ['bold', 'underline', 'clear']],
    ['indice', ['superscript', 'subscript']],
    ['viñeta', ['ul', 'ol', 'paragraph']],
    ['tabla', ['table']],
    ['insertar', ['link', 'picture']],
    ['vista', ['fullscreen']]
  ];

  render() {
    return (
      <ReactSummernote
        value={this.props.value}
        options={{
          lang: 'es-ES',
          height: 350,
          toolbar: this.getToolbar(),
          fontNames: ['Arial']
        }}
        disabled={this.props.disabled}
        onChange={this.props.onDocumentChange}
        ref={(summernote) => {
          this.summernote = summernote;
        }}
        onImageUpload={this.onImageUpload}
      />
    );
  }
}
