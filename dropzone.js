var React = require('react');

var Dropzone = React.createClass({displayName: "Dropzone",
  getInitialState: function() {
    return {
      isDragActive: false
    }
  },

  propTypes: {
    onDrop: React.PropTypes.func.isRequired,
    size: React.PropTypes.number,
    style: React.PropTypes.object
  },

  onDragLeave: function(e) {
    this.setState({
      isDragActive: false
    });
  },

  onDragOver: function(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";

    this.setState({
      isDragActive: true
    });
  },

  onDrop: function(e) {
    e.preventDefault();

    this.setState({
      isDragActive: false
    });

    var files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }

    if (this.props.onDrop) {
      this.props.onDrop(files);
    }
  },

  onClick: function () {
    this.refs.fileInput.getDOMNode().click();
  },

  render: function() {

    var className = 'dropzone';
    if (this.state.isDragActive) {
      className += ' active';
    };

    var style = {
      width: this.props.size || 100,
      height: this.props.size || 100,
      borderStyle: this.state.isDragActive ? "solid" : "dashed"
    };

    return (
      React.createElement("div", {className: className, style: this.props.style || style, onClick: this.onClick, onDragLeave: this.onDragLeave, onDragOver: this.onDragOver, onDrop: this.onDrop},
        React.createElement("input", {style: {display: 'none'}, type: "file", accept: this.props.accept, multiple: this.props.multiple, ref: "fileInput", onChange: this.onDrop}),
        this.props.children
      )
    );
  }

});

module.exports = Dropzone;
