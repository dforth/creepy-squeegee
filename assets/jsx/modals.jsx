
var ModalButton = React.createClass({
    _handleButtonClick: function(e) {
        $(this.refs['payload'].getDOMNode()).modal();
    },
    render: function() {

        var modal;

        switch(this.props["modalType"]) {

            case "confirm":

                modal = (
                    <ConfirmModal ref="payload"
                        title={this.props['title']}
                        body={this.props['body']}
                        okButtonText={this.props['okButtonText']}
                        cancelButtonText={this.props['cancelButtonText']}
                        successHandler={this.props['successHandler']}
                        successContext={this.props['successContext']}
                    />
                );

                break;
            case "prompt":

                modal = (
                    <PromptModal ref="payload"
                        title={this.props['title']}
                        body={this.props['body']}
                        initialValue={this.props['initialValue']}
                        okButtonText={this.props['okButtonText']}
                        cancelButtonText={this.props['cancelButtonText']}
                        successHandler={this.props['successHandler']}
                        successContext={this.props['successContext']}
                    />
                );

                break;
            default:
                throw "Unknown modalType: " + this.props["modalType"];
        }

        return (
            <span>
                <button type="button" className="btn btn-default" onClick={this._handleButtonClick} disabled={this.props.disabled} >{this.props['buttonText']}</button>
                {modal}
            </span>
        );
    }
});

var ModalLink = React.createClass({
    _handleLinkClick: function(e) {
        $(this.refs['payload'].getDOMNode()).modal();
    },
    render: function() {

        var modal;

        switch(this.props["modalType"]) {

            case "confirm":

                modal = (
                    <ConfirmModal ref="payload"
                                  title={this.props['title']}
                                  body={this.props['body']}
                                  okButtonText={this.props['okButtonText']}
                                  cancelButtonText={this.props['cancelButtonText']}
                                  successHandler={this.props['successHandler']}
                                  successContext={this.props['successContext']}
                        />
                );

                break;
            case "prompt":

                modal = (
                    <PromptModal ref="payload"
                                 title={this.props['title']}
                                 body={this.props['body']}
                                 initialValue={this.props['initialValue']}
                                 okButtonText={this.props['okButtonText']}
                                 cancelButtonText={this.props['cancelButtonText']}
                                 successHandler={this.props['successHandler']}
                                 successContext={this.props['successContext']}
                        />
                );

                break;
            default:
                throw "Unknown modalType: " + this.props["modalType"];
        }

        return (
            <span>
                <a href="#" onClick={this._handleLinkClick}>{this.props['anchorBody']}</a>
                {modal}
            </span>
        );
    }
});

// TODO: this doesn't work well when a successhandler calls show on the same common modal
//
var CommonModalButton = React.createClass({
    _handleButtonClick: function(e) {

        var commonModal = this.props['commonModal'];

        switch(this.props["modalType"]) {

            case "info":

                commonModal.showInfoModal(
                    this.props.title,
                    this.props.body,
                    this.props.closeButtonText
                );

                break;
            case "confirm":

                commonModal.showConfirmModal(
                    this.props.title,
                    this.props.body,
                    this.props.successHandler,
                    this.props.okButtonText,
                    this.props.cancelButtonText
                );

                break;
            case "prompt":

                commonModal.showPromptModal(
                    this.props.title,
                    this.props.body,
                    this.props.successHandler,
                    this.props.promptDefaultValue,
                    this.props.okButtonText,
                    this.props.cancelButtonText
                );

                break;
            default:
                throw "Unknown modalType: " + this.props["modalType"];
        }
    },
    render: function() {

        return (
            <span>
                <button type="button" className="btn btn-default" onClick={this._handleButtonClick} disabled={this.props.disabled} >{this.props['buttonText']}</button>
            </span>
        );
    }
});

var CommonModal = React.createClass({

    getInitialState: function() {

        return {
            modalType: 'info',
            title: 'TBD',
            body: 'TBD',
            promptDefaultValue: '',
            successHandler: null,
            successContext: null,
            closeButtonText: 'Close',
            okButtonText: 'Ok',
            cancelButtonText: 'Cancel'
        };
    },
    componentDidMount: function() {
        // Initialize the modal, once we have the DOM node
        // TODO: Pass these in via props
        $(this.getDOMNode()).modal({background: true, keyboard: true, show:false});
    },
    componentWillUnmount: function() {
        $(this.getDOMNode()).off('hidden');
    },
    _handleCloseClick: function(e) {
        e.stopPropagation();
    },
    _handleOkClick: function(e) {
        e.stopPropagation();

        if (this.state.successHandler) {

            if (this.state.modalType == 'prompt') {

                var value = this.refs['promptValue'].getDOMNode().value;
                this.state.successHandler(value), this.state.successContext;

            } else {

                this.state.successHandler(this.state.successContext);
            }
        }
    },
    showInfoModal: function(title, body, closeButtonText) {

        $(this.getDOMNode()).modal({background: true, keyboard: true, show:false});

        var newCloseButtonText = this.state.closeButtonText;

        if (closeButtonText) {

            newCloseButtonText = closeButtonText;
        }

        this.setState({
            modalType: 'info',
           title: title,
            body: body,
            closeButtonText: newCloseButtonText
        });

        $(this.getDOMNode()).modal();
    },
    showConfirmModal: function(title, body, successHandler, successContext, okButtonText, cancelButtonText) {

        $(this.getDOMNode()).modal({background: true, keyboard: true, show:false});

        var newOkButtonText = this.state.okButtonText;

        if (okButtonText) {

            newOkButtonText = okButtonText;
        }

        var newCancelButtonText = this.state.cancelButtonText;

        if (cancelButtonText) {

            newCancelButtonText = cancelButtonText;
        }

        this.setState({
            modalType: 'confirm',
            title: title,
            body: body,
            successHandler: successHandler,
            successContext: successContext,
            okButtonText: newOkButtonText,
            cancelButtonText: newCancelButtonText
        });

        $(this.getDOMNode()).modal();
    },

    showPromptModal: function(title, body, successHandler, successContext, promptDefaultValue, okButtonText, cancelButtonText) {

        $(this.getDOMNode()).modal({background: true, keyboard: true, show:false});

        var newOkButtonText = this.state.okButtonText;

        if (okButtonText) {

            newOkButtonText = okButtonText;
        }

        var newCancelButtonText = this.state.cancelButtonText;

        if (cancelButtonText) {

            newCancelButtonText = cancelButtonText;
        }

        this.setState({
            modalType: 'prompt',
            title: title,
            body: body,
            promptDefaultValue: promptDefaultValue,
            successHandler: successHandler,
            successContext: successContext,
            okButtonText: newOkButtonText,
            cancelButtonText: newCancelButtonText
        });

        $(this.getDOMNode()).modal();
    },


    render: function() {

        var header = (
            <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="tokenModalLabel">{this.state.title}</h4>
            </div>
        );

        var body;
        var footer;

        if (this.state.modalType == 'info') {

            body = (
                <div className="modal-body">
                    {this.state.body}
                </div>
            );

            footer = (
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" data-dismiss="modal">{this.state.closeButtonText}</button>
                </div>
            );

        } else if (this.state.modalType == 'confirm') {

            body = (
                <div className="modal-body">
                    {this.state.body}
                </div>
            );

            footer = (
                <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">{this.state.cancelButtonText}</button>
                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this._handleOkClick}>{this.state.okButtonText}</button>
                </div>
            );

        } else if (this.state.modalType == 'prompt') {

            body = (
                <div className="modal-body">
                    {this.state.body}
                    <div className="modals-prompt-container">
                        <input ref="promptValue" type="text" name="promptText" value={this.state.promptDefaultValue}/>
                    </div>
                </div>
            );

            footer = (
                <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">{this.state.cancelButtonText}</button>
                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this._handleOkClick}>{this.state.okButtonText}</button>
                </div>
            );
        }

        return (
            <div onClick={this._handleCloseClick} className="modal fade" role="dialog" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        {header}
                        {body}
                        {footer}
                    </div>
                </div>
            </div>
        );
    }
});

var ConfirmModal = React.createClass({
    componentDidMount: function() {
        // Initialize the modal, once we have the DOM node
        // TODO: Pass these in via props
        $(this.getDOMNode()).modal({background: true, keyboard: true, show: false});
    },
    componentWillUnmount: function() {
        $(this.getDOMNode()).off('hidden');
    },
    _handleCancelClick: function(e) {
        e.stopPropagation();
    },
    _handleOkClick: function(e) {
        e.stopPropagation();

        if (this.props.successHandler) {

            this.props.successHandler(this.props.successContext);
        }
    },
    render: function() {

        var cancelButtonText = "Cancel";

        if (this.props['cancelButtonText']) {

            cancelButtonText = this.props['cancelButtonText'];
        }

        var okButtonText = "Ok";

        if (this.props['okButtonText']) {

            okButtonText = this.props['okButtonText'];
        }

        return (
            <div onClick={this._handleCancelClick} className="modal fade" role="dialog" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title" id="tokenModalLabel">{this.props.title}</h4>
                        </div>
                        <div className="modal-body">
                            {this.props.body}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">{cancelButtonText}</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this._handleOkClick}>{okButtonText}</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

var PromptModal = React.createClass({
    componentDidMount: function() {
        // Initialize the modal, once we have the DOM node
        // TODO: Pass these in via props
        $(this.getDOMNode()).modal({background: true, keyboard: true, show: false});
    },
    componentWillUnmount: function() {
        $(this.getDOMNode()).off('hidden');
    },
    _handleCancelClick: function(e) {
        e.stopPropagation();
    },
    _handleOkClick: function(e) {
        e.stopPropagation();

        var value = this.refs['promptValue'].getDOMNode().value;

        if (this.props.successHandler) {

            this.props.successHandler(value, this.props.successContext);
        }
    },
    render: function() {

        var cancelButtonText = "Cancel";

        if (this.props['cancelButtonText']) {

            cancelButtonText = this.props['cancelButtonText'];
        }

        var okButtonText = "Ok";

        if (this.props['okButtonText']) {

            okButtonText = this.props['okButtonText'];
        }

        return (
            <div onClick={this._handleCancelClick} className="modal fade" role="dialog" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title" id="tokenModalLabel">{this.props.title}</h4>
                        </div>
                        <div className="modal-body">
                            {this.props.body}
                            <div className="aebn_modals-prompt-container">
                                <input ref="promptValue" type="text" name="promptText" value={this.props.initialValue}/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">{cancelButtonText}</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this._handleOkClick}>{okButtonText}</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});