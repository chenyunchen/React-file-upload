React = require 'react'

Dropzone = React.createClass {
  displayName: 'Dropzone'
  getInitialState: -> {isDragActive: false}
  propTypes: {
    onDrop: React.PropTypes.func.isRequired
    size: React.PropTypes.number
    style: React.PropTypes.object
  }
  onDragLeave: (e) -> @setState {isDragActive: false}
  onDragOver: (e) ->
    e.preventDefault!
    e.dataTransfer.dropEffect = 'copy'
    @setState {isDragActive: true}
  onDrop: (e) ->
    e.preventDefault!
    @setState {isDragActive: false}
    files = void
    if e.dataTransfer then files = e.dataTransfer.files else if e.target then files = e.target.files
    if @props.onDrop then @props.onDrop files
  onClick: -> @refs.fileInput.getDOMNode!.click!
  render: ->
    className = 'dropzone'
    className += ' active' if @state.isDragActive
    style =
      width: @props.size || 100
      height: @props.size || 100
      borderStyle: if @state.isDragActive then 'solid' else 'dashed'

    React.createElement 'div', {
      className: className
      style: @props.style || style
      onClick: @onClick
      onDragLeave: @onDragLeave
      onDragOver: @onDragOver
      onDrop: @onDrop
    }, (React.createElement 'input', {
      style: {display: 'none'}
      type: 'file'
      accept: @props.accept
      multiple: @props.multiple
      ref: 'fileInput'
      onChange: @onDrop
    }), @props.children
}

module.exports = Dropzone
