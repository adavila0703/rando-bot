const Card = ({ id, username, name, email, droprate }) => {
    return (
        <div className="bg-light-green dib br3 ma3 grow shadow-5">
            <img alt="robot" src={`https://robohash.org/${id}?200x200`} />
            <div className="tc">
                <h2>{name}</h2>
                <p>{email}</p>
                <p>{(1 - droprate).toFixed(2)} %</p>
            </div>
        </div>
    );
};

export default Card;
