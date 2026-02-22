export default function StatusMessage ({type, message}) {
    if (!message) return null;

    const styles = {
         success: { background: "#d4edda", color: "#155724", border: "1px solid #c3e6cb" },
         error: { background: "#f8d7da", color: "#721c24", border: "1px solid #f5c6cb" },
    };


    return (
        <p style ={{ padding: "10px 14px", borderRadius: "6px", marginTop: "10px", ...styles[type] }}>
            {message}
        </p>
    );
}