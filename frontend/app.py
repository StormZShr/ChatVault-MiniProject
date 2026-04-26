import streamlit as st
import requests

API = "http://localhost:8000"

st.set_page_config(page_title="ChatVault", layout="wide", page_icon="🗄️")

st.markdown("""
<style>
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Playfair+Display:wght@700&display=swap');

html, body, [class*="css"] {
    background-color: #0f0f0f;
    color: #e0e0e0;
    font-family: 'Space Mono', monospace;
}

h1, h2, h3 {
    font-family: 'Playfair Display', serif;
    color: #f0a500;
}

.stButton>button {
    background-color: #f0a500;
    color: #0f0f0f;
    border: none;
    border-radius: 4px;
    font-weight: 700;
    font-family: 'Space Mono', monospace;
    width: 100%;
    padding: 0.5rem;
}

.stButton>button:hover {
    background-color: #ffbb33;
    color: #0f0f0f;
}

.stSelectbox>div>div {
    background-color: #1a1a1a;
    color: #e0e0e0;
}

.stFileUploader {
    background-color: #1a1a1a;
    border: 1px dashed #f0a500;
    border-radius: 8px;
    padding: 1rem;
}

section[data-testid="stSidebar"] {
    background-color: #1a1a1a;
    border-right: 1px solid #2a2a2a;
}
</style>
""", unsafe_allow_html=True)

st.title("🗄️ ChatVault")
st.caption("Your class media, organised.")

with st.sidebar:
    st.markdown("## Upload Media")
    st.markdown("---")

    uploader_name = st.text_input("Your Name", placeholder="e.g. Sohrab")
    category = st.selectbox(
        "Category",
        ["notes", "information", "funny"],
        format_func=lambda x: {"notes": "📒 Notes", "information": "ℹ️ Information", "funny": "😂 Funny Media"}[x]
    )
    files = st.file_uploader(
        "Choose files",
        accept_multiple_files=True,
        type=["jpg", "jpeg", "png", "gif", "mp4", "mov"]
    )

    if st.button("Upload"):
        if not uploader_name:
            st.warning("Please enter your name.")
        elif not files:
            st.warning("Please select at least one file.")
        else:
            with st.spinner("Uploading..."):
                all_uploaded = True
                for f in files:
                    response = requests.post(
                        f"{API}/upload",
                        data={"category": category, "uploader": uploader_name},
                        files={"files": (f.name, f.read(), f.type)}
                    )
                    if response.status_code != 200:
                        st.error(f"Failed to upload {f.name}")
                        all_uploaded = False

                if all_uploaded:
                    st.success(f"✅ {len(files)} file(s) uploaded to {category}!")
                    st.rerun()

tab1, tab2, tab3 = st.tabs(["📒 Notes", "ℹ️ Information", "😂 Funny Media"])

for tab, cat in zip([tab1, tab2, tab3], ["notes", "information", "funny"]):
    with tab:
        try:
            response = requests.get(f"{API}/media?category={cat}")
            media_items = response.json()
        except Exception:
            st.error("Could not connect to backend. Is it running?")
            media_items = []

        if not media_items:
            st.markdown(
                "<div style='text-align:center; padding: 3rem; color: #555;'>"
                "📭 Nothing here yet. Upload something!</div>",
                unsafe_allow_html=True
            )
        else:
            cols = st.columns(3)
            for i, item in enumerate(media_items):
                with cols[i % 3]:
                    url = item["media_url"]
                    filename = item["filename"]
                    uploader = item["uploader"]

                    if any(filename.lower().endswith(ext) for ext in [".mp4", ".mov", ".avi"]):
                        st.video(url)
                    else:
                        st.image(url, use_container_width=True)

                    st.caption(f"📁 {filename}")
                    st.caption(f"👤 {uploader}")
                    
                    if st.button("🗑️ Delete", key=f"del_{item['id']}"):
                        requests.delete(f"{API}/media/{item['id']}")
                        st.rerun()
