import React, { Component } from "react";
import { getUsers, changeUser, searchUsers } from "../../services/httpService";
import AdminUserCard from "./AdminUserCard";
import { Button, Modal } from "react-bootstrap";
class AdminUserSearch extends Component {
  state = { users: [], show: false, selectedUser: "", search: "" };

  async componentDidMount() {
    let users = await getUsers();
    this.setState({ users, show: false, selectedUser: "" });
  }

  deleteUser = async () => {
    let users = [...this.state.users];
    users.forEach((value, index, array) => {
      if (value.email === this.state.selectedUser) {
        array[index].authority = 0;
      }
    });
    this.setState({ users, show: false });
    await changeUser(this.state.selectedUser);
  };

  handleModal = (email) => {
    this.setState({ ...this.state, show: true, selectedUser: email });
  };

  handleClose = () => this.setState({ ...this.state, show: false });

  handleShow = () => this.setState({ ...this.state, show: true });

  search = async () => {
    let users = await searchUsers(this.state.search);
    this.setState({ ...this.state, users });
  };

  render() {
    return (
      <div className="row m-0">
        <div className="row m-0 input-group pt-2 pb-2 mb-1 border-bottom ">
          <div className="col-sm-12 col-md-11">
            <input
              type="text"
              className="form-control w-100 border-black"
              placeholder="Pretraga"
              aria-label="Pretraga"
              aria-describedby="basic-addon1"
              value={this.state.search}
              onChange={(e) =>
                this.setState({ ...this.state, search: e.target.value })
              }
            />
          </div>
          <div className="col-sm-12 col-md-1 p-0">
            <button
              className="w-100 btn-search-admin p-2 pb-1 text-white text-center"
              onClick={this.search}>
              Pretraži
            </button>
          </div>
        </div>
        <Modal size={"xl"} show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton={this.handleClose}>
            <Modal.Title>Potvrdi</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h2>
              Da li ste sigurni da želite da obrišete ovog korisnika <br />
              Korisnik će postati gost{" "}
            </h2>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Ne
            </Button>
            <Button variant="primary" onClick={this.deleteUser}>
              Da
            </Button>
          </Modal.Footer>
        </Modal>
        {this.state.users.map((value) => (
          <AdminUserCard user={value} handleModal={this.handleModal} />
        ))}
      </div>
    );
  }
}

export default AdminUserSearch;
