import Nav from "./nav"

export default function Layout({children}) {
    return (
        <div className="relative flex flex-col items-center">
            <Nav />
            <main className="h-screen flex items-center">{children}</main>
        </div>
    )
}