(function(win) {

  var invalidity = {
    invalidTitle : false
  };

  win.CourseScreen = React.createClass({
    getInitialState : function() {
      return Object.assign({}, invalidity, this.props.course);
    },
    onSave : function() {
      var course = Object.assign({}, this.state);
      Object.keys(invalidity).forEach(function(key) {
        delete course[key];
      });
      this.props.store.dispatch({
        type : "REQUEST_SAVE_COURSE",
        value : course
      });
    },
    onTitleInputChange : function(e) {
      this.setState({
        title : e.target.value,
        invalidTitle : e.target.value.length == 0
      });
    },
    onDelete : function() {
      this.props.store.dispatch({
        type : "REQUEST_DELETE_COURSE"
      });
    },
    onEntries : function() {
      this.props.store.dispatch({
        type : "SELECT_ENTRIES"
      });
    },
    render : function() {
      var title = this.props.course.id
        ? "Edit van course " + this.props.course.title : "Maken van course";
      return (
        <div>
          <h3>{title}</h3>
          <input required={true} type="text" onChange={this.onTitleInputChange}
            value={this.state.title} />
          <button disabled={this.state.invalidTitle} onClick={this.onSave}>Save</button>
          <button onClick={this.props.onMain}>Back</button>
          <button onClick={this.onEntries}>Show entries</button>
          <button onClick={this.onDelete}>Delete</button>
        </div>
      );
    }
  });

}(window));