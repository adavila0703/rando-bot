import Card from "./Card";

const CardList = ({ robots }) => (
    <div>
        {robots.map(({ id, name, username, email, dropRate }, i) => (
            <Card
                key={i}
                id={id}
                name={name}
                username={username}
                email={email}
                droprate={dropRate}
            />
        ))}
    </div>
);

export default CardList;
