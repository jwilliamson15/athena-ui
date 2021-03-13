function Header() {
    return (
        <div
            className="mb-3"
            style={{
            backgroundColor: "#282c34",
            minHeight: "15vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "calc(10px + 2vmin)",
            color: "white"
        }}>
            <h1>Athena</h1>
        </div>
    );
}

export default Header;