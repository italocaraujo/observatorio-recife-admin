'use client';

import styles from "@/app/styles/pages/page.module.css";
import additionalStyles from "@/app/styles/layout/LayoutPage.module.css";
import { useState } from "react";
import PageTitle from "@/components/layout/PageTitle";
import Loading from "@/components/layout/Loading";

export default function SendFiles() {
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    return (
    <main className={additionalStyles.mainContent}>
        <div className={additionalStyles.container}>
        <div className={additionalStyles.titleContainer}>
            <PageTitle title="Manutenção do Site" />
        </div>
        </div>
    </main>
    );
}
