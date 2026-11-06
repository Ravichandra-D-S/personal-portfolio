from flask import Flask, jsonify
from flask_cors import CORS
import sqlite3
from pathlib import Path

app = Flask(__name__)
CORS(app)

DATABASE = Path(__file__).parent / "portfolio.db"


def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn


def initialize_database():
    conn = get_db_connection()

    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            tag TEXT NOT NULL,
            icon TEXT NOT NULL,
            github TEXT NOT NULL
        )
        """
    )

    project_count = conn.execute(
        "SELECT COUNT(*) FROM projects"
    ).fetchone()[0]

    if project_count == 0:
        projects = [
            (
                "LandLens",
                "An intelligent land record digitization and validation system that uses OCR to extract and organize land record information.",
                "React • Flask • Supabase • OCR",
                "🗺️",
                "https://github.com/Ravichandra-D-S/LandLens",
            ),
            (
                "CareerMap",
                "A career readiness platform that helps learners understand their current skills and build a clearer path toward a technology career.",
                "React • Python • Supabase",
                "🚀",
                "https://github.com/Ravichandra-D-S",
            ),
            (
                "PyPath 365",
                "A project focused on building consistent Python programming skills through daily learning and progress tracking.",
                "Python • Web Development",
                "🐍",
                "https://github.com/Ravichandra-D-S/pypath-365",
            ),
        ]

        conn.executemany(
            """
            INSERT INTO projects (title, description, tag, icon, github)
            VALUES (?, ?, ?, ?, ?)
            """,
            projects,
        )

    conn.commit()
    conn.close()


initialize_database()


@app.route("/api/projects", methods=["GET"])
def get_projects():
    conn = get_db_connection()
    projects = conn.execute("SELECT * FROM projects").fetchall()
    conn.close()

    return jsonify([dict(project) for project in projects])


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "Backend and database are running successfully!"})


if __name__ == "__main__":
    app.run(debug=True, port=5000)