import LeafletMap from "@/Components/LeafletMap";
import { Link, Head } from "@inertiajs/react";

export default function Welcome() {
    return (
        <>
            <Head title="Map" />
            <LeafletMap />
        </>
    );
}
