import {
    Outlet,
    NavLink,
    Link,
    useLoaderData,
    Form,
    useNavigation,
} from "react-router-dom";
import { getContacts, createContact } from "../contacts";

export async function action() {
    const contact = await createContact();
    return { contact };
}

export async function loader() {
    const contacts = await getContacts();
    return { contacts };
}

export default function Root() {
    const { contacts } = useLoaderData();
    const navigation = useNavigation();
    return (
        <>
            <div id='sidebar'>
                <h1>React Router Contacts</h1>
                <div>
                    <form id='search-form' role='search'>
                        <input
                            id='q'
                            aria-label='Search Contacts'
                            placeholder='Search'
                            type='search'
                            name='q'
                        />
                        <div
                            id='search-spinner'
                            aria-hidden
                            hidden={true}></div>

                        <div className='sr-only' aria-live='polite'></div>
                    </form>
                    <Form method='post'>
                        <button type='submit'>New</button>
                    </Form>
                </div>

                {/* Navigation Bar for contacts */}
                <nav>
                    {contacts.length ? (
                        <ul>
                            {contacts.map((contact) => (
                                <li key={contact.id}>
                                    <NavLink
                                        to={`contacts/${contact.id}`}
                                        className={({ isActive, isPending }) =>
                                            isActive
                                                ? "active"
                                                : isPending
                                                ? "pending"
                                                : ""
                                        }>
                                        <Link to={`contacts/${contact.id}`}>
                                            {contact.first || contact.last ? (
                                                <>
                                                    {contact.first}{" "}
                                                    {contact.last}
                                                </>
                                            ) : (
                                                <i>No Name</i>
                                            )}{" "}
                                            {contact.favorite && <span>★</span>}
                                        </Link>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>
                            <i>No Contacts</i>
                        </p>
                    )}
                </nav>
            </div>
            <div
                id='detail'
                className={navigation.state === "loading" ? "loading" : ""}>
                <Outlet />
            </div>
        </>
    );
}
