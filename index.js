var Button = ReactBootstrap.Button;
var Panel = ReactBootstrap.Panel;
var FormGroup = ReactBootstrap.FormGroup;
var ControlLabel = ReactBootstrap.ControlLabel;
var FormControl = ReactBootstrap.FormControl;
var Col = ReactBootstrap.Col;
var HelpBlock = ReactBootstrap.HelpBlock;
var Row = ReactBootstrap.Row
var Image = ReactBootstrap.Image;
const wellStyles = {maxWidth: 400, margin: '0 auto 10px'};

var createObjectURL = (window.URL || window.webkitURL).createObjectURL || window.createObjectURL;

var ContentMessage = React.createClass(
  {
    render: function() {
      let lines = this.props.message.split(/\n/g);
      let br = lines.map(function(line) {
        return (<div>{line}<br /></div>)
      })
      return (<div>{br}</div>)
    }
  }
)

var ContentViewer = React.createClass(
  {
    render: function(){
        let contents =
        this.props.contents.map(elm =>
          <Panel header={elm.author} bsStyle='info'>
          <Col md={4} xs={4}>
            <Image src={elm.file} responsive />
          </Col>
          <ContentMessage message={elm.message} />
          </Panel>)
        return(
          <div>
            <Col xs={12} md={6} mdOffset={3} xsOffset={3}>
              {contents.reverse()}
            </Col>
          </div>
        );

    }
  }
)

var ContentWriter = React.createClass(
  {
    getInitialState: function() {
      return {inputAuthor: "名無し", inputMessage: ``, inputFile: '', errors: []}
    },
    // 投稿ボタンが押下された時の処理
    validate: function(){
      //dispatcher
      let isValid = this.state.inputMessage !== "";
      if (isValid) {
        //contentを作って渡す
        this.props.onSubmit({
          author: this.state.inputAuthor,
          message: this.state.inputMessage,
          file: this.state.inputFile
        })
      } else {
        this.setState({errors: this.state.errors.concat([{name: "message", message: "invalid value"}])})
      }
    },
    // フォームに値が入力された時の処理
    authorInput: function(e){
      this.setState({inputAuthor: e.target.value})
    },
    messageInput: function(e){
      this.setState({inputMessage: e.target.value})
    },
    fileInput: function(e){
      // ①イベントからfileの配列を受け取る
      var files = e.target.files;
      // ②createObjectURLで、files[0]を読み込む
      var image_url = createObjectURL(files[0]);
      // ③setStateする！
      this.setState({inputFile: image_url});
    },
    render: function(){
      let errorSpan = this.state.errors.map(elm => <span>{elm.message}</span>)
      return (
        //View ~ UserInteraction
        <div>
          <Panel header="新規投稿" bsStyle="primary" maxWidth='10'>
          <Row>
          <Col xs={6} md={5}>
            <FormGroup>
              <ControlLabel>投稿者</ControlLabel>
              <FormControl placeholder="名前を入力" onChange={this.authorInput} />
            </FormGroup>
          </Col>
          </Row>
            {errorSpan}
          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>投稿内容</ControlLabel>
            <FormControl componentClass="textarea" placeholder="文字を入力" onChange={this.messageInput} />
          </FormGroup>
          <FormGroup controlId='formControlsFile'>
            <ControlLabel>ファイル</ControlLabel>
            <FormControl type="file" onChange={this.fileInput} />
            <HelpBlock>現在は画像形式のみ対応</HelpBlock>
          </FormGroup>
          <Row>
            <Col xs={6} md={6} xsOffset={3} mdOffset={3}>
              <Image src={this.state.inputFile} responsive />
            </Col>
          </Row>
          <div  className="well" style={wellStyles}>
            <Button bsSize="large" block onClick={this.validate}>投稿</Button>
          </div>
          </Panel>
        </div>
      )
    }
  }
)

var Application = React.createClass(
  {
    getInitialState: function(){
      return {
        contents: []
      }
    },
    addContent: function(content) {
      if(content != null){
        this.setState(
          {
            contents: this.state.contents.concat([content])
          }
        )
      }
    },
    render: function(){
      return (
        <div>
          <Row>
            <Col xs={12} md={6} mdOffset={3}>
              <ContentWriter onSubmit={this.addContent} />
            </Col>
          </Row>
          <Row>
            <ContentViewer contents={this.state.contents} />
          </Row>
        </div>
      )
    }
  }
)

ReactDOM.render( < Application /> ,
    document.getElementById('container')
);
