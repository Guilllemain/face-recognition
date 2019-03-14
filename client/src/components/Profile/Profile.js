import React from 'react'
import './profile.css'

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.user.name,
            age: this.props.user.age,
            country: this.props.user.country
        }
    }

    onProfileUpdate = data => {
        fetch(`http://localhost:3000/profile/${this.props.user.id}`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({formInput: data})
        }).then(response => {
            this.props.toggleModal();
            this.props.loadUser({...this.props.user, ...data});
        }).catch (error => console.log(error)) 
    }

    onFormChange = event => {
        switch(event.target.name) {
            case 'user-name':
                this.setState({name: event.target.value})
                break
            case 'user-age':
                this.setState({age: event.target.value})
                break
            case 'user-country':
                this.setState({country: event.target.value})
                break
            default:
                return;
        }
    }

    render() {
        return (
        <div className="profile-modal">
            <article className="relative br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
                <main className="pa4 black-80 w-80">
                    <img
                        src="http://tachyons.io/img/logo.jpg"
                        className="h3 w3 dib" alt="avatar" />
                    <h1>{this.state.name}</h1>
                    <h4>Images submitted: 5</h4>
                    <p>Member since January</p>
                    <hr />
                    <label className="mt2 fw6 " htmlFor="user-name">Name</label>
                    <input
                        onChange={this.onFormChange}
                        className="pa2 ba w-100"
                        placeholder="John"
                        type="text"
                        name="user-name"
                        id="name"
                    />
                    <label className="mt2 fw6 " htmlFor="user-age">Age</label>
                    <input
                        onChange={this.onFormChange}
                        className="pa2 ba w-100"
                        placeholder="36"
                        type="text"
                        name="user-age"
                        id="age"
                    />
                    <label className="mt2 fw6 " htmlFor="user-name">Country</label>
                    <input
                        onChange={this.onFormChange}
                        className="pa2 ba w-100"
                        placeholder="France"
                        type="text"
                        name="user-country"
                        id="country"
                    />
                    <div className="mt4" style={{display: 'flex', justifyContent: 'space-between'}}>
                        <button onClick={() => this.onProfileUpdate(this.state)} className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20">
                            Save
                        </button>
                        <button onClick={this.props.toggleModal} className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20">
                            Cancel
                        </button>
                    </div>
                </main>
                <div className="modal-close" onClick={this.props.toggleModal}>&times;</div>
            </article>
        </div>
        )
    }

}

export default Profile