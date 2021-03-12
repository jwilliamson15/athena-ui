import Jumbotron from 'react-bootstrap/Jumbotron';

function Header() {
    return (
        <Jumbotron style={{
            textAlign: "center",
            color: "white",
            backgroundColor: "#202451"
        }}>
            <h1>Athena</h1>
        </Jumbotron>
    );
}

export default Header;