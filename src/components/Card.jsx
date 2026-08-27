const Card = ({ user, loggedInUser }) => {
    const { firstName, lastName, photoUrl, about, skill, age, gender } = user;

    return <div className="card bg-base-300 w-96 shadow-sm">
        <figure className="">
            <img
                className="max-h-96 object-contain"
                src={photoUrl}
                alt="user photo" />
        </figure>
        <div className="card-body">
            <h2 className="card-title">{firstName + " " + lastName}</h2>
            <h2 className="card-title">{age || " "  + " " + gender || " "}</h2>
            <p>About : {about}</p>
            <p>Skill: {skill?.toString()}</p>
            <div className="card-actions justify-center">
                <button className="btn btn-secondary">Intrested</button>
                <button className="btn btn-primary">Ignore</button>
            </div>
        </div>
    </div>
}
export default Card;