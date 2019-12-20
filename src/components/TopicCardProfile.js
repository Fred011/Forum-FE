import React, { Component } from 'react'
import topicService from '../lib/topic-service';


export class TopicCardProfile extends Component {

    handleDeleteTopic = e => {
        const { id } = this.props.match.params;
    
        e.preventDefault();
        topicService.deleteOneTopic(id).then(() => {
          this.props.history.push("/");
        });
      };

    render() {
        return (
            <div>
            <div className="card-container">
                <div className='topic-card-profile'>

                    <div className="topic-preview-profile">
                        <h3>{this.props.title} 
                            <img onClick={this.handleDeleteTopic} className='delete-btn-profile-topic' src="/delete.svg" alt="delete-btn"/>
                        </h3>
                        <p>{this.props.message}</p>
                        delete
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default TopicCardProfile
