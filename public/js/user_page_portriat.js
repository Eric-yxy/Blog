var UserPagePortraitCom = React.createClass({
    getInitialState : function(){
      return{
        isAttention : false,
        attention : '关注'
      }
    },
    addAttention : function(){
      if(this.state.isAttention){
        this.setState({
          isAttention : false,
          attention : '关注'
        })
      }else{
        this.setState({
          isAttention : true,
          attention : '已关注'
        })
      }

    },
    render : function(){
        var data = this.props.currentUserData;
        return(
            <section id="user-detail-wrap">
                <div className="user-detail-inner">
                    <div className="head-portrait-wrap">
                        <img src="../img/test/header-portrait.jpg" alt=""/>
                    </div>
                    <h2 className="head-username">{this.context.currentUser}</h2>
                    <h2 className="head-user-introduce">一句话介绍一下自己吧，让别人介绍自己</h2>
                    <div className={this.state.isAttention ? "isAttention-btn" : "attention-btn"} onClick = {this.addAttention}>
                      {
                        this.state.attention
                      }
                    </div>
                </div>
            </section>
        )
    }
})
