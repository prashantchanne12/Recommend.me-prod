import React from 'react';
import {
    EditorState,
    getDefaultKeyBinding,
    RichUtils,
    convertToRaw,
} from 'draft-js';
import 'draft-js/dist/Draft.css';
import './createRecommendation.scss';
import { stateToHTML } from 'draft-js-export-html';
import chroma from 'chroma-js';
import Select from 'react-select';
import { colourOptions } from './data/data';
import Button from '../../components/Button/Button';

import { connect } from 'react-redux';
import { addRecommendAction } from '../../actions/recommendActions';
import { alertMessageAction } from '../../actions/alertActions';
import createLinkPlugin from '@draft-js-plugins/anchor';
import Editor from '@draft-js-plugins/editor';
import createInlineToolbarPlugin from '@draft-js-plugins/inline-toolbar';
// import {
//   ItalicButton,
//   BoldButton,
//   UnderlineButton,
// } from '@draft-js-plugins/buttons';

const MAX_LENGTH = 450;
const linkPlugin = createLinkPlugin();
const inlineToolbarPlugin = createInlineToolbarPlugin();
// const { InlineToolbar } = inlineToolbarPlugin;
const plugins = [linkPlugin, inlineToolbarPlugin];


class CreateRecommendationScreen extends React.Component{

    constructor(props) {
        super(props);
        this.state = { editorState: EditorState.createEmpty(), options: [], title: '' };
    
        this.focus = () => this.refs.editor.focus();
        this.onChange = (editorState) => this.setState({ editorState });
    
        this.handleChips = (value) => {
          this.state.options = value;
        };
    
        this.colourStyles = {
          control: (styles) => ({ ...styles, backgroundColor: "white" }),
          option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            const color = chroma(data.color);
            return {
              ...styles,
              backgroundColor: isDisabled
                ? null
                : isSelected
                ? data.color
                : isFocused
                ? color.alpha(0.1).css()
                : null,
              color: isDisabled
                ? "#ccc"
                : isSelected
                ? chroma.contrast(color, "white") > 2
                  ? "white"
                  : "black"
                : data.color,
              cursor: isDisabled ? "not-allowed" : "default",
    
              ":active": {
                ...styles[":active"],
                backgroundColor:
                  !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
              },
            };
          },
          multiValue: (styles, { data }) => {
            const color = chroma(data.color);
            return {
              ...styles,
              backgroundColor: color.alpha(0.1).css(),
            };
          },
          multiValueLabel: (styles, { data }) => ({
            ...styles,
            color: data.color,
          }),
          multiValueRemove: (styles, { data }) => ({
            ...styles,
            color: data.color,
            ":hover": {
              backgroundColor: data.color,
              color: "white",
            },
          }),
        };
    
        this.handleKeyCommand = this._handleKeyCommand.bind(this);
        this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
        this.toggleBlockType = this._toggleBlockType.bind(this);
        this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
      }
    
      _handleKeyCommand(command, editorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
          this.onChange(newState);
          return true;
        }
        return false;
      }
    
      _mapKeyToEditorCommand(e) {
        if (e.keyCode === 9 /* TAB */) {
          const newEditorState = RichUtils.onTab(
            e,
            this.state.editorState,
            4 /* maxDepth */
          );
          if (newEditorState !== this.state.editorState) {
            this.onChange(newEditorState);
          }
          return;
        }
        return getDefaultKeyBinding(e);
      }
    
      _toggleBlockType(blockType) {
        this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
      }
    
      _toggleInlineStyle(inlineStyle) {
        this.onChange(
          RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
        );
      }
    
      _getLengthOfSelectedText = () => {
        const currentSelection = this.state.editorState.getSelection();
        const isCollapsed = currentSelection.isCollapsed();
    
        let length = 0;
    
        if (!isCollapsed) {
          const currentContent = this.state.editorState.getCurrentContent();
          const startKey = currentSelection.getStartKey();
          const endKey = currentSelection.getEndKey();
          const startBlock = currentContent.getBlockForKey(startKey);
          const isStartAndEndBlockAreTheSame = startKey === endKey;
          const startBlockTextLength = startBlock.getLength();
          const startSelectedTextLength =
            startBlockTextLength - currentSelection.getStartOffset();
          const endSelectedTextLength = currentSelection.getEndOffset();
          const keyAfterEnd = currentContent.getKeyAfter(endKey);
          if (isStartAndEndBlockAreTheSame) {
            length +=
              currentSelection.getEndOffset() - currentSelection.getStartOffset();
          } else {
            let currentKey = startKey;
    
            while (currentKey && currentKey !== keyAfterEnd) {
              if (currentKey === startKey) {
                length += startSelectedTextLength + 1;
              } else if (currentKey === endKey) {
                length += endSelectedTextLength;
              } else {
                length += currentContent.getBlockForKey(currentKey).getLength() + 1;
              }
    
              currentKey = currentContent.getKeyAfter(currentKey);
            }
          }
        }
    
        return length;
      };
    
      _handleBeforeInput = () => {
        const currentContent = this.state.editorState.getCurrentContent();
        const currentContentLength = currentContent.getPlainText("").length;
        const selectedTextLength = this._getLengthOfSelectedText();
    
        if (currentContentLength - selectedTextLength > MAX_LENGTH - 1) {
    
          alertMessageAction({message: "you can type max 450 characters!", type: "failure"});

          return "handled";
        }
      };
    
      _handlePastedText = (pastedText) => {
        const currentContent = this.state.editorState.getCurrentContent();
        const currentContentLength = currentContent.getPlainText("").length;
        const selectedTextLength = this._getLengthOfSelectedText();
    
        if (
          currentContentLength + pastedText.length - selectedTextLength >
          MAX_LENGTH
        ) {
          alertMessageAction({message: "you can type max 450 characters!", type: "failure"});
    
          return "handled";
        }
      };

      handleTitle = (e) => {
        this.setState({title: e.target.value});
      }
    
      handleSubmit = () => {

        this.setState({
          buttonClicked: true,
        });

        const { 
          addRecommendAction,
          alertMessageAction } = this.props;

        const { options, title } = this.state;
    
        const blocks = convertToRaw(this.state.editorState.getCurrentContent())
          .blocks;

        if (blocks.length === 1 && blocks[0].text === "") {
          // return alert("Please add recommendation!");
          return alertMessageAction({message: "Please add recommendation!", type: "failure"});
  
        } else {
          
          
          if(title.length === 0){
            return alertMessageAction({message: "Title is required!", type: "failure"});
          }
          else if (options.length === 0) {
            // return alert("Please select Tags!");
            return alertMessageAction({message: "Please select Tags!", type: "failure"});

          } else if (options.length > 2) {
            // return alert("You can select max 3 Tags!");
            return alertMessageAction({message: "You can select max 2 Tags!", type: "failure"});
            
          }


          let finalData = stateToHTML(this.state.editorState.getCurrentContent());
          
          finalData = finalData
            .split("\n")
            // eslint-disable-next-line
            .filter((str) => str != "<h1><br></h1>")
            // eslint-disable-next-line
            .filter((str) => str != "<h2><br></h2>")
            // eslint-disable-next-line 
            .filter((str) => str != "<h3><br></h3>")
            // eslint-disable-next-line
            .filter((str) => str != "<p><br></p>")
            .join("");
    

          addRecommendAction({data: finalData, tags: options, title: title});
          alertMessageAction({message: "Recommendation created successfully", type: "success"});


          this.setState({
            editorState: EditorState.createEmpty(),
            buttonClicked: false,
            title: '',
          });
        }
      };
    
      render() {
        const { editorState } = this.state;
        // const clear = false;
        // If the user changes block type before entering any text, we can
        // either style the placeholder or hide it. Let's just hide it now.
        let className = "RichEditor-editor";
        var contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) {
          if (contentState.getBlockMap().first().getType() !== "unstyled") {
            className += " RichEditor-hidePlaceholder";
          }
        }

    
        return (
          <div className="editor-container">

          <div className="title-recommendation" >
                <span>Title</span>
                <input 
                required
                type="text" 
                placeholder="ex. My top 10 Fav books..."
                onChange={this.handleTitle}
                value={this.state.title}
          />
              </div>

            <div className="RichEditor-root">
              <BlockStyleControls
                editorState={editorState}
                onToggle={this.toggleBlockType}
              />
              <InlineStyleControls
                editorState={editorState}
                onToggle={this.toggleInlineStyle}
              />
              <div className={className} onClick={this.focus}>
                <Editor
                  blockStyleFn={getBlockStyle}
                  plugins={plugins}
                  customStyleMap={styleMap}
                  editorState={editorState}
                  handleKeyCommand={this.handleKeyCommand}
                  keyBindingFn={this.mapKeyToEditorCommand}
                  onChange={this.onChange}
                  placeholder="1. Sapiens: A Brief History of Humankind"
                  ref="editor"
                  spellCheck={true}
                  handleBeforeInput={this._handleBeforeInput}
                  handlePastedText={this._handlePastedText}
                />


        {/* <InlineToolbar>
          {
            // may be use React.Fragment instead of div to improve perfomance after React 16
            (externalProps) => (
              <div>
                <BoldButton {...externalProps} />
                <ItalicButton {...externalProps} />
                <UnderlineButton {...externalProps} />
                <linkPlugin.LinkButton {...externalProps} />
              </div>
            )
          }
        </InlineToolbar> */}

              </div>
            </div>
            <div className="tags">
              <span>Select Tags</span>
              <div className="select-tags">
                <Select
                  closeMenuOnSelect={false}
                  // defaultValue={[colourOptions[0], colourOptions[1]]}
                  isMulti
                  key={`${Date.now()}`}
                  options={colourOptions}
                  isSearchable={true}
                  styles={this.colourStyles}
                  onChange={this.handleChips}
                  className='select'
                />
              </div>
            </div>
            <div className="btn">
              <Button onClick={this.handleSubmit} />
            </div>
          </div>
        );
      }
    }
    
    // Custom overrides for "code" style.
    const styleMap = {
      CODE: {
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
      },
    };
    
    function getBlockStyle(block) {
      switch (block.getType()) {
        case "blockquote":
          return "RichEditor-blockquote";
        default:
          return null;
      }
    }
    
    class StyleButton extends React.Component {
      constructor() {
        super();
        this.onToggle = (e) => {
          e.preventDefault();
          this.props.onToggle(this.props.style);
        };
      }
    
      render() {
        let className = "RichEditor-styleButton";
        if (this.props.active) {
          className += " RichEditor-activeButton";
        }
    
        return (
          <span className={className} onMouseDown={this.onToggle}>
            {this.props.label}
          </span>
        );
      }
    }
    
    const BLOCK_TYPES = [
      // { label: "H1", style: "header-one" },
      // { label: "H2", style: "header-two" },
      // { label: "H3", style: "header-three" },
      // { label: "H4", style: "header-four" },
      // { label: "H5", style: "header-five" },
      // { label: "H6", style: "header-six" },
      { label: "Blockquote", style: "blockquote" },
      { label: "UL", style: "unordered-list-item" },
      { label: "OL", style: "ordered-list-item" },
    ];
    
    const BlockStyleControls = (props) => {
      const { editorState } = props;
      const selection = editorState.getSelection();
      const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();
    
      return (
        <div className="RichEditor-controls">
          {BLOCK_TYPES.map((type) => (
            <StyleButton
              key={type.label}
              active={type.style === blockType}
              label={type.label}
              onToggle={props.onToggle}
              style={type.style}
            />
          ))}
        </div>
      );
    };
    
    var INLINE_STYLES = [
      { label: "Bold", style: "BOLD" },
      { label: "Italic", style: "ITALIC" },
      { label: "Underline", style: "UNDERLINE" },
      { label: "Monospace", style: "CODE" },
    ];
    
    const InlineStyleControls = (props) => {
      const currentStyle = props.editorState.getCurrentInlineStyle();
    
      return (
        <div className="RichEditor-controls">
          {INLINE_STYLES.map((type) => (
            <StyleButton
              key={type.label}
              active={currentStyle.has(type.style)}
              label={type.label}
              onToggle={props.onToggle}
              style={type.style}
            />
          ))}
        </div>
      );
}

const mapDispatchToProps = (dispatch) => ({
  addRecommendAction: (data) => dispatch(addRecommendAction(data)),
  alertMessageAction: ({message, type}) => dispatch(alertMessageAction({message, type})),
})


export default connect(null, mapDispatchToProps)(CreateRecommendationScreen);
