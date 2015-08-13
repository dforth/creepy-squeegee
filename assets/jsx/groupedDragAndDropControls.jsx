
var DRAG_DROP_CONTENT_TYPE = 'custom-drag-and-drop-data';

var DragStateEnum = Object.freeze({
    "Source": Object.freeze({value: 1, className: "aebn_gdadc_beingDrug"}),
    "TargetLeft": Object.freeze({value: 2, className: "aebn_gdadc_dropOverLeft"}),
    "TargetRight": Object.freeze({value: 3, className: "aebn_gdadc_dropOverRight"}),
    "TargetTop": Object.freeze({value: 4, className: "aebn_gdadc_dropOverTop"}),
    "TargetBottom": Object.freeze({value: 5, className: "aebn_gdadc_dropOverBottom"}),
    "TargetGroup": Object.freeze({value: 6, className: "aebn_gdadc_dropGroup"})
});

var dragEntryIcon = document.createElement('img');
dragEntryIcon.src = '/images/entryIcon.png';

var dragGroupIcon = document.createElement('img');
dragGroupIcon.src = '/images/groupIcon.png';

var GROUP_PREFIX_LIST = ['group-target-','group-element-'];

var ENTRY_PREFIX_LIST = ['content-queue-movie-'];

// A little help from my friends
function getPreferredParent(currentElement, parentIdPrefixList) {

    //console.log('getPreferredParent ', currentElement, parentIdPrefixList);
    var testElement = currentElement;

    while (testElement != null && testElement != document) {

        //console.log('\ttesting: ', testElement);
        // This will by default favor prefixes left to right
        for (var i=0; i < parentIdPrefixList.length; i++) {

            if (testElement.id.indexOf(parentIdPrefixList[i]) == 0) {
                //console.log('\treturning: ', testElement);
                return testElement;
            }
        }

        testElement = testElement.parentElement;
    }

    return null;
}

var ContentQueueMovie = React.createClass({
    _removeHandler: function(index) {

        //console.log('ContentQueueMovie removeHandler: ', index);

        // Calling parent
        if (typeof this.props.removeHandler === 'function') {
            this.props.removeHandler(index);
        } else {
            console.log('What is it: ', this.props.removeHandler);
        }
    },
    render: function() {

        var movieId = this.props.movieId;

        return (
            <div className="aebn_gdadc_contentQueueMovie" id={"content-queue-movie-" + this.props.parentIndex} >
                <div id={'label-' + movieId} >
                    <div className="aebn_gdadc_entryTitle">
                        <span>M {movieId}</span>
                    </div>
                    <div className="aebn_gdadc_entryControls">
                        <span><a href="#" onClick={this._removeHandler.bind(this, this.props.parentIndex)} ><span className="glyphicon glyphicon-remove"></span></a></span>
                    </div>

                </div>

                <img
                    id={'content-queue-image-' + movieId}
                    data-toggle="tooltip"
                    data-placement="top"
                    title={'com.aebn.content.domain.movie.Movie.movieId ' + movieId}
                    width="90"
                    height="120"
                    src={'http://pic.aebn.net/Stream/Movie/Boxcovers/a' + movieId + '_160w.jpg'}
                />

            </div>
        );
    }
});

var CarouselSlide = React.createClass({
    _removeHandler: function(index) {

        //console.log('CarouselSlide removeHandler: ', index);

        // Calling parent
        if (typeof this.props.removeHandler === 'function') {
            this.props.removeHandler(index);
        } else {
            console.log('What is it: ', this.props.removeHandler);
        }
    },
    render: function() {

        var slideId = this.props.slideId;

        return (
            <div className="aebn_gdadc_carouselSlide" id={"carousel-slide-" + this.props.parentIndex} >
                <div id={'label-' + slideId} >
                    <div className="aebn_gdadc_entryTitle">
                        <span>CS {slideId}</span>
                    </div>
                    <div className="aebn_gdadc_entryControls">
                        <span><a href="#" onClick={this._removeHandler.bind(this, this.props.parentIndex)} ><span className="glyphicon glyphicon-remove"></span></a></span>
                    </div>

                </div>

                <img
                    id={'carousel-slide-image-' + slideId}
                    data-toggle="tooltip"
                    data-placement="top"
                    title={'com.aebn.application.domain.carousel.CarouselSlide.carouselSlideId ' + slideId}
                    width="90"
                    src={this.props.imageUrl}
                />
            </div>
        );
    }
});

var Carousel = React.createClass({
    _removeHandler: function(index) {

        // Calling parent
        if (typeof this.props.removeHandler === 'function') {
            this.props.removeHandler(index);
        } else {
            console.log('What is it: ', this.props.removeHandler);
        }
    },
    render: function() {

        var carouselId = this.props.listEntry.entry.carouselId;

        return (
            <div className="aebn_gdadc_layout_entry" id={"carousel-" + this.props.parentIndex} >

                    <div className="aebn_gdadc_entryTitle">
                        <span>Carousel ({carouselId})</span>
                    </div>
                    <div className="aebn_gdadc_entryControls">
                        <span><a href="#" onClick={this._removeHandler.bind(this, this.props.parentIndex)} ><span className="glyphicon glyphicon-remove"></span></a></span>
                    </div>
            </div>
        );
    }
});

var ContentQueue = React.createClass({
    _removeHandler: function(index) {

        // Calling parent
        if (typeof this.props.removeHandler === 'function') {
            this.props.removeHandler(index);
        } else {
            console.log('What is it: ', this.props.removeHandler);
        }
    },
    render: function() {

        var contentQueue = this.props.listEntry.entry;

        return (
            <div className="aebn_gdadc_layout_entry" id={"carousel-" + this.props.parentIndex} >
                    <div className="aebn_gdadc_entryTitle">
                        <span>Content Queue ({contentQueue.contentQueueId}) - {contentQueue.displayTitle}</span>
                    </div>
                    <div className="aebn_gdadc_entryControls">
                        <span><a href="#" onClick={this._removeHandler.bind(this, this.props.parentIndex)} ><span className="glyphicon glyphicon-remove"></span></a></span>
                    </div>
            </div>
        );
    }
});

var Group = React.createClass({

    _removeEntryHandler: function(index) {

        //console.log('Group removeHandler called: ', index);

        //call parent handler
        this.props.removeEntryHandler(this.props.groupIndex, index);
    },
    _removeGroupHandler: function() {

        //console.log('Group removeGroupHandler called');

        this.props.removeGroupHandler(this.props.groupIndex);

    },
    _separateHandler: function() {

        //console.log('Group _separateHandler called');

        this.props.separateHandler(this.props.groupIndex);
    },
    _onDragStart: function(event) {

        //console.log('group _onDragStart: ', event.target.id);
        var entryIndex = null;
        var preferedElement = getPreferredParent(event.target, ENTRY_PREFIX_LIST);

        if (preferedElement) {

            var elementId = preferedElement.id;
            entryIndex = elementId.substring(elementId.lastIndexOf('-') + 1);
        }

        // drag outside of the entry means the group

        this.props.onDragStart(event, this.props.groupIndex, entryIndex);
    },
    _onDragEnd: function(event) {

        this.props.onDragEnd(event, this.props.groupIndex);
    },
    _onDragEnter: function(event) {

        var preferedElement = getPreferredParent(event.target, GROUP_PREFIX_LIST);
        var addToGroupFlag = (preferedElement != null && preferedElement.id.indexOf('group-target-') == 0);

        this.props.onDragEnter(event, this.props.groupIndex, React.findDOMNode(this.refs.groupElement), addToGroupFlag);
    },
    _onDragOver: function(event) {

        var preferedElement = getPreferredParent(event.target, GROUP_PREFIX_LIST);
        var addToGroupFlag = (preferedElement != null && preferedElement.id.indexOf('group-target-') == 0);

        this.props.onDragOver(event, this.props.groupIndex, React.findDOMNode(this.refs.groupElement), addToGroupFlag);
    },
    _onDrop: function(event) {

        var preferedElement = getPreferredParent(event.target, GROUP_PREFIX_LIST);
        var addToGroupFlag = (preferedElement != null && preferedElement.id.indexOf('group-target-') == 0);

        this.props.onDrop(event, this.props.groupIndex, addToGroupFlag);
    },
    render: function() {

        var cx = React.addons.classSet;
        var classes = cx({
            'aebn_gdadc_group': (this.props.contentType != 'layout'),
            'aebn_gdadc_group_vertical': (this.props.contentType == 'layout'),
            'aebn_gdadc_beingDrug': (this.props.group.dragState == DragStateEnum.Source),
            'aebn_gdadc_dropOverLeft': (this.props.group.dragState == DragStateEnum.TargetLeft),
            'aebn_gdadc_dropOverRight': (this.props.group.dragState == DragStateEnum.TargetRight),
            'aebn_gdadc_dropOverTop': (this.props.group.dragState == DragStateEnum.TargetTop),
            'aebn_gdadc_dropOverBottom': (this.props.group.dragState == DragStateEnum.TargetBottom)
        });

        var groupFlag = (this.props.group.entries.length > 1);

        var groupClasses = cx({
            'aebn_gdadc_groupActive': groupFlag
        });

        var groupTargetClasses = cx({
            'aebn_gdadc_groupTarget': (this.props.contentType != 'layout'),
            'aebn_gdadc_groupTarget_vertical': (this.props.contentType == 'layout'),
            'aebn_gdadc_highlight': (this.props.groupDragHighlight),
            'aebn_gdadc_groupSelect': (this.props.group.dragState == DragStateEnum.TargetGroup)
        });

        var groupTitle = null;
        var groupControls = null;

        if (this.props.groupDragHighlight && !groupFlag) {

            if (this.props.group.dragState == DragStateEnum.TargetGroup) {

                groupTitle = <span>Drop To Add</span>;

            } else {

                groupTitle = <span>Add To Group</span>;
            }

        } else if (this.props.groupDragHighlight && groupFlag) {

            if (this.props.group.dragState == DragStateEnum.TargetGroup) {

                groupTitle = <span>Drop To Combine</span>;

            } else {

                groupTitle = <span>Combine With Group</span>;
            }

        } else if (groupFlag) {

            groupTitle = <span className="text-default">Random Group <span className="glyphicon glyphicon-random"></span></span>;

            groupControls = (
                <div className="aebn_gdadc_groupControls">
                    <a href="#" onClick={this._separateHandler}><span className="glyphicon glyphicon-ban-circle"></span></a>
                    <span>&nbsp;</span>
                    <a href="#" onClick={this._removeGroupHandler}><span className="glyphicon glyphicon-remove"></span></a>
                </div>
            );
        }

        //console.log('classes: ', classes);

        var groupContentClasses = cx({
            'aebn_gdadc_group_content_vertical': (this.props.contentType == 'layout'),
        });

        return (
            <div className={classes} id={'groupEntry-' + this.props.group.position} draggable="true"
                 onDragStart={this._onDragStart}
                 onDragEnd={this._onDragEnd}
                 onDragEnter={this._onDragEnter}
                 onDragOver={this._onDragOver}
                 onDrop={this._onDrop}
                >
                <div id={"group-element-" + this.props.groupIndex} ref="groupElement" className={groupClasses}>
                    <div id={'group-target-' + this.props.groupIndex} className={groupTargetClasses}>
                        <span>{groupTitle}</span><span>&nbsp;</span>
                        {groupControls}
                    </div>
                    <div className={groupContentClasses}>
                    {
                        this.props.group.entries.map(function (entry, index) {

                            if (entry.entryType == 'com.aebn.content.domain.movie.Movie.movieId') {

                                return (
                                    <ContentQueueMovie
                                        key={index}
                                        parentIndex={index}
                                        movieId={entry.entryId}
                                        removeHandler={this._removeEntryHandler} />
                                );

                            } else if (entry.entryType == 'com.aebn.application.domain.carousel.CarouselSlide.carouselSlideId') {

                                return (
                                    <CarouselSlide
                                        key={index}
                                        parentIndex={index}
                                        slideId={entry.entryId}
                                        imageUrl={entry.entry.imageUrl}
                                        removeHandler={this._removeEntryHandler}
                                        />
                                );

                            } else if (entry.entryType == 'com.aebn.application.domain.carousel.Carousel.carouselId') {

                                return (

                                    <Carousel
                                        key={index}
                                        parentIndex={index}
                                        listEntry={entry}
                                        removeHandler={this._removeEntryHandler}
                                        />
                                );

                            } else if (entry.entryType == 'com.aebn.application.domain.contentqueue.ContentQueue.contentQueueId') {

                                return (
                                    <ContentQueue
                                        key={index}
                                        parentIndex={index}
                                        listEntry={entry}
                                        removeHandler={this._removeEntryHandler}
                                        />
                                );

                            } else {
                                return (
                                    <div>
                                        <span className="text-warning">??{entry.entryType}?? </span>
                                    </div>
                                )
                            }

                        }.bind(this))
                    }
                        </div>
                </div>
            </div>
        );
    }
});

var DragControl = React.createClass({

    getInitialState: function() {

        return {
            pendingChanges: false,
            currentTargetIndex: null,
            groups: []
        };
    },

    componentDidMount: function () {

        if (this.props.getHandler) {

            var data = this.props.getHandler();

            //console.log('getHandler returned: ', data);

            this.setState({
                groups: this._getGroupsFromData(data)
            })
        }
    },

    _getGroupsFromData: function(data) {

        // We need to sort the data by position first
        //var sortedData = _.sortByOrder(data, ['position'], [true]);

        var groups = _.reduce(data, function(result, entry) {

            if (result['pos-' + entry.position] == undefined) {

                result['pos-' + entry.position] = {
                    position: entry.position,
                    entries: [],
                    dragState: null
                };
            }

            result['pos-' + entry.position].entries.push(entry);

            return result;
        }, {} );

        //Convert groups back to an array to keep things simple.
        return _.reduce(groups, function(result, group) {
            result.push(group);
            return result;
        }, [] );
    },
    _convertGroupsToFlatArray: function(groups) {

        var result = [];

        _.forEach(groups, function(group) {

            _.forEach(group.entries, function(entry) {

                result.push(entry);
            });
        });

        return result;
    },
    _setGroupDragState: function(groupIndex, newDragState) {

        //console.log('_setGroupDragState: ', groupIndex, newDragState);

        var groups = this.state.groups;

        if (groups[groupIndex].dragState != newDragState) {

            groups[groupIndex].dragState = newDragState;

            var currentTargetIndex = this.state.currentTargetIndex;

            if (this.state.currentTargetIndex != null && this.state.currentTargetIndex != groupIndex) {

                groups[this.state.currentTargetIndex].dragState = null;
            }

            if (newDragState != null && newDragState != DragStateEnum.Source) {

                currentTargetIndex = groupIndex;

            } else {

                currentTargetIndex = null;
            }

            this.setState({
                currentTargetIndex: currentTargetIndex,
                groups: groups
            });
        }
    },
    _getGroupDragState: function(groupIndex) {

        var groups = this.state.groups;

        return groups[groupIndex].dragState;
    },
    _saveClick: function() {

        var newData = this._convertGroupsToFlatArray(this.state.groups);

        if (this.props['saveHandler']) {

            // If the handler wants to reload - that's up to the handler - we do not know what page we are even in.
            this.props['saveHandler'](newData);
        }

        this.setState({
            pendingChanges: false
        });
    },
    _resetPositions: function(groups) {

        // Reset positions for groups - group position will be updated for each of its entries
        _.forEach(groups, function(group, index) {

            group.position = index;
            _.forEach(group.entries, function(entry) {
                entry.position = group.position;
            });
        });

        return groups;
    },
    _randomizePositions: function() {

        var entries = this._convertGroupsToFlatArray(this.state.groups);
        entries = _.shuffle(entries);

        // Fix positions
        entries = _.map(entries, function(item, index) {
            item.position = index;
            return item;
        });

        this.setState({
            pendingChanges:true,
            groups: this._getGroupsFromData(entries)
        });
    },
    _convertAllToGroup: function() {

        var entries = this._convertGroupsToFlatArray(this.state.groups);

        // Fix positions
        entries = _.map(entries, function(item, index) {
            item.position = 0;
            return item;
        });

        this.setState({
            pendingChanges:true,
            groups: this._getGroupsFromData(entries)
        });
    },
    _removeAll: function() {

        this.setState({
            pendingChanges: true,
            currentTargetIndex: null,
            groups: []
        });

    },
    _revertState: function() {
        if (this.props.getHandler) {

            var data = this.props.getHandler();

            //console.log('getHandler returned: ', data);

            this.setState({
                groups: this._getGroupsFromData(data),
                pendingChanges:false
            })
        }
    },
    _hasEntryId: function(entryId) {

        for(var i=0; i < this.state.groups.length; i++) {

            var group = this.state.groups[i];

            for(var j=0; j < group.entries.length; j++) {

                var entry = group.entries[j];
                if (entry.entryId == entryId) {

                    return true;
                }
            }
        }

        return false;
    },
    _addMovieHandler: function(response) {

        // convert to list
        //console.log('response = ', response);
        var movieIds = processIdString(response, true, false, null);
       // console.log('movieIds: ', movieIds);

        var invalidList = [];
        var updateFlag = false;
        var groups = this.state.groups;

        for(var i=0; i<movieIds.length; i++) {

            var movieId = Number(movieIds[i]);
            //console.log('attempting to add: ', movieId);
            // Is this a dupe?
            if (this._hasEntryId(movieId)) {

                invalidList.push({
                    movieId: movieId,
                    reason: 'Already Exists'
                });

                //TODO: check that the movieId is valid?
                /*} else if (!this._isValidMovieId(movieId)) {

                 invalidList.push({
                 movieId: movieId,
                 reason: 'Invalid MovieId'
                 });
                 */
            } else {

                //console.log('\tadding movie: ', movieId);

                var newGroup = {
                    position: -1,
                    entries: [{
                        listEntryId: -1,
                        position: -1,
                        entryId: movieId,
                        entryType: 'com.aebn.content.domain.movie.Movie.movieId'
                    }],
                    dragState: null
                };

                groups.push(newGroup);
                updateFlag = true;
            }
        }

        if (updateFlag) {

            groups = this._resetPositions(groups);

            this.setState({
                pendingChanges:true,
                groups:groups
            });
        }

        if (invalidList.length > 0) {

            var messageBody = (
                <div>
                    <table className="table table-striped table-hover">
                        <thead>
                        <th>Movie ID</th>
                        <th>Reason</th>
                        </thead>
                        <tbody>
                        {_.map(invalidList, function(error) {
                            return (
                                <tr><td>{error.movieId}</td><td>{error.reason}</td></tr>
                            );
                        }.bind(this))}
                        </tbody>
                    </table>
                </div>
            );

            this._showMessage('Invalid Movies', messageBody);
        }
    },
    _addSlideHandler: function(response) {

        // convert to list
        //console.log('response = ', response);
        var slideIds = processIdString(response, true, false, null);
        //console.log('slideIds: ', slideIds);

        var invalidList = [];
        var updateFlag = false;
        var groups = this.state.groups;

        for(var i=0; i<slideIds.length; i++) {

            var slideId = Number(slideIds[i]);
            //console.log('attempting to add: ', slideId);
            // Is this a dupe?
            if (this._hasEntryId(slideId)) {

                invalidList.push({
                    slideId: slideId,
                    reason: 'Already Exists'
                });

            } else {

                if (this.props['getEntryHandler']) {

                    var newEntry = this.props['getEntryHandler'](slideId);

                    //console.log('newEntry: ', newEntry);
                    if (newEntry) {

                        //console.log('\tadding slide: ', slideId);

                        var newGroup = {
                            position: -1,
                            entries: [{
                                listEntryId: -1,
                                position: -1,
                                entryId: slideId,
                                entryType: 'com.aebn.application.domain.carousel.CarouselSlide.carouselSlideId',
                                entry: newEntry
                            }],
                            dragState: null
                        };

                        groups.push(newGroup);
                        updateFlag = true;

                    } else {

                        invalidList.push({
                            slideId: slideId,
                            reason: 'Invalid SlideId'
                        });
                    }
                }
            }
        }

        if (updateFlag) {

            groups = this._resetPositions(groups);

            this.setState({
                pendingChanges:true,
                groups:groups
            });
        }

        if (invalidList.length > 0) {

            var messageBody = (
                <div>
                    <table className="table table-striped table-hover">
                        <thead>
                        <th>Slide ID</th>
                        <th>Reason</th>
                        </thead>
                        <tbody>
                        {_.map(invalidList, function(error) {
                            return (
                                <tr><td>{error.slideId}</td><td>{error.reason}</td></tr>
                            );
                        }.bind(this))}
                        </tbody>
                    </table>
                </div>
            );

            this._showMessage('Invalid Slides', messageBody);

        }
    },
    _removeGroupConfirm: function(groupIndex) {

        this._showConfirmModal(
            "Delete this group and all it's content?",
            "Are you sure?",
            this._removeGroup,
            groupIndex
        );
    },
    _removeGroup: function(groupIndex) {

        //console.log('_removeGroup', groupIndex);

        var groups = this.state.groups;

        // Remove the whole group.
        groups.splice(groupIndex, 1);

        this.setState({
            pendingChanges:true,
            groups:groups
        });
    },
    _removeEntry: function(entryId) {

        function findGroupAndEntry(groups, entryId) {

            for(var groupIndex = 0; groupIndex < groups.length; groupIndex++) {

                for(var entryIndex = 0; entryIndex < groups[groupIndex].entries.length; entryIndex ++) {

                    var entry = groups[groupIndex].entries[entryIndex];

                    if (entry.id == entryId) {

                        //console.log('found entry: ', groups[groupIndex].position, entryIndex);

                        return {
                            groupIndex: groupIndex,
                            entryIndex: entryIndex
                        }
                    }
                }
            }

            return null;
        }

        //console.log('_removeMovie: ', entryId);

        var groups = this.state.groups;

        var findResult = findGroupAndEntry(groups, entryId);

        this._removeEntryFromGroup(findResult.groupIndex, findResult.entryIndex);

    },
    _removeEntryFromGroupConfirm: function(groupIndex, entryIndex) {

        this._showConfirmModal(
            "Delete this entry?",
            "Are you sure?",
            this._removeEntryFromGroup,
            {
                groupIndex: groupIndex,
                entryIndex: entryIndex
            }
        );
    },
    _removeEntryFromGroup: function(context) {

        //console.log('_removeEntryFromGroup: ', context);

        if (context == null) {

            return;
        }

        var groups = this.state.groups;

        if (groups[context.groupIndex].entries.length > 1) {

            // Remove just the entry from the group.
            groups[context.groupIndex].entries.splice(context.entryIndex, 1);

        } else {

            // Remove the whole group.
            groups.splice(context.groupIndex, 1);
        }

        this.setState({pendingChanges: true, groups: groups});

    },
    _separateGroupEntitiesConfirm: function(groupIndex) {

        this._showConfirmModal(
            "Disband this group, while keeping content?",
            "Are you sure?",
            this._separateGroupEntities,
            groupIndex
        );
    },
    _separateGroupEntities: function(groupIndex) {

        //console.log('_separateGroupEntities: ', groupIndex);

        var groups = this.state.groups;
        var sourceGroup = groups[groupIndex];

        if (sourceGroup != null && sourceGroup.entries.length > 1) {

            //TODO: this results in multiple state updates
            for(var i = sourceGroup.entries.length - 1; i>=0; i--) {

                var sourceEntry = sourceGroup.entries[i];

                // Remove the entry
                sourceGroup.entries.splice(i, 1);

                // Add the entry to it's new location
                var newGroup = {
                    position: -1,
                    entries: [sourceEntry],
                    dragState: false
                };

                groups.splice(groupIndex + 1, 0, newGroup);
            }

            // Remove the now empty group
            groups.splice(groupIndex, 1);

            // Fix position numbers
            groups = this._resetPositions(groups);

            this.setState({pendingChanges:true, groups: groups});
        }
    },
    _moveGroup: function(currentGroupIndex, newGroupIndex) {

        if (currentGroupIndex == newGroupIndex) {
            return;
        }

        //console.log('_moveGroup: ', currentGroupIndex, newGroupIndex);

        var groups = this.state.groups;
        var group = groups[currentGroupIndex];

        groups.splice(newGroupIndex, 0, group);
        var delIndex = currentGroupIndex;
        if (newGroupIndex <= currentGroupIndex) {
            delIndex++;
        }
        groups.splice(delIndex, 1);

        groups = this._resetPositions(groups);

        this.setState({pendingChanges:true, groups: groups});

    },
    _addGroupToGroup: function(sourceGroupIndex, targetGroupIndex) {

        //console.log('_addGroupToGroup: ', sourceGroupIndex, targetGroupIndex);

        if (sourceGroupIndex != targetGroupIndex) {

            var groups = this.state.groups;
            var sourceGroup = groups[sourceGroupIndex];
            var targetGroup = groups[targetGroupIndex];

            for(var i=0; i<sourceGroup.entries.length; i++) {

                targetGroup.entries.push(sourceGroup.entries[i]);
            }

            // Remove the source group
            groups.splice(sourceGroupIndex, 1);

            // Fix position numbers
            groups = this._resetPositions(groups);

            this.setState({pendingChanges:true, groups: groups});
        }
    },
    _moveEntryFromGroupToGroup: function(sourceGroupIndex, sourceEntryIndex, targetGroupIndex) {

        //console.log('_moveEntryFromGroupToGroup: ', sourceGroupIndex, sourceEntryIndex, targetGroupIndex);

        if (sourceGroupIndex != targetGroupIndex) {
            var groups = this.state.groups;
            var sourceGroup = groups[sourceGroupIndex];
            var sourceEntry = sourceGroup.entries[sourceEntryIndex];

            // Add the entry to it's new location
            var targetGroup = groups[targetGroupIndex];
            targetGroup.entries.push(sourceEntry);

            if (sourceGroup.entries.length == 1) {

                // Just remove the whole group
                groups.splice(sourceGroupIndex, 1);

            } else {

                // Remove the entry
                sourceGroup.entries.splice(sourceEntryIndex, 1);
            }

            // Fix position numbers
            groups = this._resetPositions(groups);

            this.setState({pendingChanges:true, groups: groups});
        }
    },
    _moveEntryFromGroupToNewGroup: function(sourceGroupIndex, sourceEntryIndex, newGroupIndex) {

        //console.log('_moveEntryFromGroupToNewGroup: ', sourceGroupIndex, sourceEntryIndex, newGroupIndex);

        var groups = this.state.groups;
        var sourceGroup = groups[sourceGroupIndex];
        var sourceEntry = sourceGroup.entries[sourceEntryIndex];

        // Remove the entry
        sourceGroup.entries.splice(sourceEntryIndex, 1);

        // Add the entry to it's new location
        var newGroup = {
            position: -1,
            entries: [sourceEntry],
            dragState: false
        };

        groups.splice(newGroupIndex, 0, newGroup);

        // Now see if we need to remove the old group
        if (sourceGroup.entries.length == 0) {

            // position of this group could be diff now.
            var delIndex = sourceGroupIndex;

            if (newGroupIndex <= sourceGroupIndex) {
                delIndex++;
            }

            groups.splice(delIndex, 1);
        }

        // Fix position numbers
        groups = this._resetPositions(groups);

        this.setState({pendingChanges:true, groups: groups});
    },
    _getDragImageForEntry: function(entry) {

        if (entry.entryType == 'com.aebn.content.domain.movie.Movie.movieId') {

            var movieImg = document.createElement('img');
            movieImg.src = 'http://pic.aebn.net/Stream/Movie/Boxcovers/a' + entry.entryId + '_160w.jpg';
            movieImg.width = '120';
            movieImg.height = '90';
            return movieImg;

        } else if (entry.entryType == 'com.aebn.application.domain.carousel.CarouselSlide.carouselSlideId') {

            var slideImg = document.createElement('img');
            slideImg.src = entry.entry.imageUrl;
            slideImg.width = '200';
            return slideImg;

        } else {

            return dragEntryIcon;
        }
    },
    _onDragStart: function(event, groupIndex, entryIndex) {

        var group = this.state.groups[groupIndex];

        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData(DRAG_DROP_CONTENT_TYPE,
            JSON.stringify({
                sourceGroupIndex: groupIndex,
                sourceEntryIndex: entryIndex
            })
        );

        if (group.entries.length > 1 && entryIndex != null) {

            event.dataTransfer.setDragImage(this._getDragImageForEntry(group.entries[entryIndex]), -10, -10);

        } else {

            if (group.entries.length > 1) {

                event.dataTransfer.setDragImage(dragGroupIcon, -10, -10);

            } else {

                event.dataTransfer.setDragImage(this._getDragImageForEntry(group.entries[0]), -10, -10);
            }
        }

        //console.log('onDragStart: ', event, groupIndex);

        this._setGroupDragState(groupIndex, DragStateEnum.Source);
    },
    _onDragEnd: function(event, groupIndex) {

        //console.log('onDragEnd: ', groupIndex);

        this._setGroupDragState(groupIndex, null);
    },
    _onDragEnter: function(event, targetGroupIndex, targetElement, addToGroupFlag) {

        //console.log('_onDragEnter: ', event.target.id, targetGroupIndex, targetElement, addToGroupFlag);

        var currentDragState = this._getGroupDragState(targetGroupIndex);
        var newDragState = null;
        if (addToGroupFlag) {

            newDragState = DragStateEnum.TargetGroup;

        } else {

            newDragState = this._getTargetDragState(event.nativeEvent.x, event.nativeEvent.y, targetElement);
        }

        if (currentDragState != DragStateEnum.Source && currentDragState != newDragState) {
            console.log('newDragState: ', newDragState);
            this._setGroupDragState(targetGroupIndex, newDragState);
        }
    },
    _onDragOver: function(event, targetGroupIndex, targetElement, addToGroupFlag) {

        //console.log('_onDragOver: ', event.target.id, targetGroupIndex, targetElement, addToGroupFlag);

        if (event.preventDefault) {
            event.preventDefault();
        }

        // exact same logic as dragenter
        this._onDragEnter(event, targetGroupIndex, targetElement, addToGroupFlag);
    },
    _onDrop: function(event, targetGroupIndex, addToGroupFlag) {

        //console.log('********* onDrop: ', event, targetGroupIndex, addToGroupFlag);

        var dragData = JSON.parse(event.dataTransfer.getData(DRAG_DROP_CONTENT_TYPE));
        var sourceGroup = this.state.groups[dragData.sourceGroupIndex];

        //console.log('dragData: ', dragData);

        if (event.stopPropagation) {
            event.stopPropagation(); // Stops some browsers from redirecting.
        }

        //Use currently set dragState to detemine if this is left or right of target
        // WE do this before the clean up
        var dragState = this._getGroupDragState(targetGroupIndex);

        // Cleanup time TODO: this results in multiple state updates - streamline it.
        this._setGroupDragState(dragData.sourceGroupIndex, null);
        this._setGroupDragState(targetGroupIndex);

        if (addToGroupFlag) {

            if (dragData.sourceEntryIndex != null && sourceGroup.entries.length > 1) {

                //moving an entry from one group to another
                this._moveEntryFromGroupToGroup(dragData.sourceGroupIndex, dragData.sourceEntryIndex, targetGroupIndex);

            } else {

                //adding one group to another
                this._addGroupToGroup(dragData.sourceGroupIndex, targetGroupIndex);
            }

        } else {

            if (dragState == DragStateEnum.TargetRight || dragState == DragStateEnum.TargetBottom) {

                targetGroupIndex ++;
            }

            if (dragData.sourceGroupIndex != targetGroupIndex) {

                if (dragData.sourceEntryIndex != null && sourceGroup.entries.length > 1) {

                    this._moveEntryFromGroupToNewGroup(dragData.sourceGroupIndex, dragData.sourceEntryIndex, targetGroupIndex);

                } else {

                    this._moveGroup(dragData.sourceGroupIndex, targetGroupIndex);
                }
            }
        }
    },
    _getTargetDragState: function(xPosition, yPosition, element) {

        var rect = element.getBoundingClientRect();

        if (rect) {

            if (this.props.contentType ==  'layout') {

                var half = rect.top + (element.offsetHeight / 2)

                if (yPosition <= half) {

                    return DragStateEnum.TargetTop;

                } else if(yPosition > half) {

                    return DragStateEnum.TargetBottom;

                } else {

                    return null;
                }

            } else {

                var half = rect.left + (element.offsetWidth / 2)

                if (xPosition <= half) {

                    return DragStateEnum.TargetLeft;

                } else if(xPosition > half) {

                    return DragStateEnum.TargetRight;

                } else {

                    return null;
                }
            }

        } else {

            return null;
        }
    },
    _showMessage: function(title, message) {

        this.refs['commonModal'].showInfoModal(title, message);
    },
    _showConfirmModal: function(title, body, successHandler, successContext, cancelButtonText, okButtonText) {
        this.refs['commonModal'].showConfirmModal(title, body, successHandler, successContext, cancelButtonText, okButtonText);
    },
    render: function() {

        var controlBarParts = [];

        if (this.props.contentType == 'contentQueue') {

            controlBarParts.push(
                <ModalButton
                    buttonText="Add Movie/s"
                    modalType="prompt"
                    title="Add Movie/s"
                    body="Movie IDs, comma delimited:"
                    successHandler={this._addMovieHandler}
                    />
            );

            controlBarParts.push(
                <ModalButton
                    buttonText="Randomize Content"
                    modalType="confirm"
                    title="Randomize Content?"
                    body="Re-order all movies randomly? (Removes Grouping)"
                    successHandler={this._randomizePositions}
                    />
            );

            controlBarParts.push(
                <ModalButton
                    buttonText="Group All"
                    modalType="confirm"
                    title="Group all content?"
                    body="Convert to single random group?"
                    successHandler={this._convertAllToGroup}
                    />
            );

            controlBarParts.push(
                <ModalButton
                    buttonText="Remove All"
                    modalType="confirm"
                    title="Remove all content?"
                    body="Are you sure you want to remove all content from this queue?"
                    successHandler={this._removeAll}
                    />
            );

        } else if (this.props.contentType == 'carousel') {

            controlBarParts.push(
                <ModalButton
                    buttonText="Add Slide/s"
                    modalType="prompt"
                    title="Add Slide/s"
                    body="Slide IDs, comma delimited:"
                    successHandler={this._addSlideHandler}
                    />
            );

            controlBarParts.push(
                <ModalButton
                    buttonText="Randomize Content"
                    modalType="confirm"
                    title="Randomize slides?"
                    body="Re-order all slides randomly? (Removes Grouping)"
                    successHandler={this._randomizePositions}
                    />
            );

            controlBarParts.push(
                <ModalButton
                    buttonText="Group All"
                    modalType="confirm"
                    title="Group all slides?"
                    body="Convert to single random group?"
                    successHandler={this._convertAllToGroup}
                    />
            );

            controlBarParts.push(
                <ModalButton
                    buttonText="Remove All"
                    modalType="confirm"
                    title="Remove all slides?"
                    body="Are you sure you want to remove all slides from this carousel?"
                    successHandler={this._removeAll}
                    />
            );


        }

        controlBarParts.push(
            <ModalButton
                buttonText="Revert"
                modalType="confirm"
                title="Revert to original state?"
                body="Abandon changes and revert to original order?"
                successHandler={this._revertState}
                disabled={!this.state.pendingChanges}
                />
        );

        controlBarParts.push(
            <button type="button" className="btn btn-primary" onClick={this._saveClick} disabled={!this.state.pendingChanges} >Save</button>
        );

        if (this.state.pendingChanges) {
            controlBarParts.push(
                <span className="text-danger"> There are unsaved changes.</span>
            );
        }

        if (this.props.contentType == 'contentQueue') {

            var entries = this._convertGroupsToFlatArray(this.state.groups);
            if (entries.length < 12) {

                controlBarParts.push(
                    <span className="text-warning"> Queues with less than 12 Items will not be displayed. </span>
                );

            }
        }

        var controls = (
            <div className="aebn_gdadc_controlBar">
            {_.forEach(controlBarParts, function(part) {
                {part}
            })}
            </div>
        );


        var infoKey = null;

        infoKey = (
            <div className="aebn_gdadc_infoKey">
                <p className="aebn_gdadc_infoText">Drag entries into desired position. Group entries by dropping on the highlighted group target. Grouped entries will appear in random order for each new session. Drag groups by clicking and dragging using the Group title. <span className="glyphicon glyphicon-remove"></span> deletes a movie or group. <span className="glyphicon glyphicon-ban-circle"></span> disbands the group putting the movies back into the queue in their current order. Changes must be saved. Navigating away will result in lost changes.</p>
            </div>
        );

        return (
            <div id="dragContent" className="aebn_gdadc_dragContent">
                {controls}
                {_.map(this.state.groups, function(group, groupIndex) {
                    return (
                        <Group
                            key={groupIndex}
                            groupIndex={groupIndex}
                            contentType={this.props.contentType}
                            group={group}
                            removeGroupHandler={this._removeGroupConfirm}
                            removeEntryHandler={this._removeEntryFromGroupConfirm}
                            separateHandler={this._separateGroupEntitiesConfirm}
                            onDragStart={this._onDragStart}
                            onDragEnd={this._onDragEnd}
                            onDragEnter={this._onDragEnter}
                            onDragOver={this._onDragOver}
                            onDrop={this._onDrop}
                            groupDragHighlight={groupIndex == this.state.currentTargetIndex}/>
                    );

                }.bind(this))}
                {infoKey}
                <CommonModal ref="commonModal" />
            </div>
        );
    }
});