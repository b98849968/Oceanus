// src/API.js
import React, { useState } from 'react';
import { useEffect } from "react";
// Base URL for the API
export const BASE_URL = `http://172.20.1.40:8000`;

// Define your API endpoints based on API_DOCS.md
export const ENDPOINTS = {
    // 1. Galleries
    getAllGalleries: `${BASE_URL}/api/galleries`,             // GET: All galleries with nested categories/items
    getBasicGalleries: `${BASE_URL}/api/galleries/basic`,     // GET: Basic gallery info (ID, name, desc, image)
    getGalleryById: (id) => `${BASE_URL}/api/galleries/${id}`,// GET: Specific gallery details

    // 2. Categories
    getAllCategories: `${BASE_URL}/api/categories`,           // GET: All active categories

    // 3. Items (Works/Images)
    getAllItems: `${BASE_URL}/api/items`,                     // GET: All items (Supports query ?gallery_id=... & ?category_id=...)
    getItemById: (id) => `${BASE_URL}/api/items/${id}`,       // GET: Specific item details with extra_images

    // 4. Settings
    getSettings: `${BASE_URL}/api/settings`,                  // GET: General site settings (contact, location, logo)
    getLogoOnly: `${BASE_URL}/api/settings/logo`,             // GET: Only the logo URL
};

/**
 * A helper function to make API requests using fetch.
 * 
 * @param {string} url - The complete API endpoint URL.
 * @param {object} options - Fetch options (method, headers, body, etc.).
 * @returns {Promise<any>} The JSON response from the API.
 */
export const fetchAPI = async (url, options = {}) => {
    try {
        const defaultHeaders = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            // Add any common headers like Authorization here if needed in the future
            // 'Authorization': `Bearer ${localStorage.getItem('token')}`
        };

        const response = await fetch(url, {
            ...options,
            headers: {
                ...defaultHeaders,
                ...options.headers,
            },
        });

        const text = await response.text();
        let data;
        try {
            data = text ? JSON.parse(text) : {};
        } catch {
            data = text;
        }

        if (!response.ok) {
            throw { status: response.status, statusText: response.statusText, data };
        }

        return data;
    } catch (error) {
        console.error('Error fetching data from API:', error);
        throw error;
    }
};

// ==========================================
// API Tester Page Component
// ==========================================

export default function APITesterPage() {

    const [endpoint, setEndpoint] = useState('/api/galleries');
    const [method, setMethod] = useState('GET');
    const [body, setBody] = useState('{\n  \n}');
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);



    // Predefined shortcuts from API_DOCS.md
    const shortcuts = [
        { label: 'All Galleries', path: '/api/galleries' },
        { label: 'Basic Galleries', path: '/api/galleries/basic' },
        { label: 'Single Gallery (ID:1)', path: '/api/galleries/1' },
        { label: 'All Categories', path: '/api/categories' },
        { label: 'All Items', path: '/api/items' },
        { label: 'Single Item (ID:1)', path: '/api/items/1' },
        { label: 'Site Settings', path: '/api/settings' },
        { label: 'Site Logo', path: '/api/settings/logo' },
    ];

    const handleShortcutClick = (path) => {
        setEndpoint(path);
        setMethod('GET'); // All documented endpoints are currently GET
    };


    const handleTest = async () => {
        setLoading(true);
        setError(null);
        setResponse(null);

        const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

        const options = { method };
        if (method !== 'GET' && method !== 'HEAD') {
            try {
                options.body = JSON.stringify(JSON.parse(body));
            } catch (err) {
                setError('Invalid JSON body format. Please check your JSON syntax.');

                setLoading(false);

                return;
            }
        }

        try {
            const result = await fetchAPI(url, options);
            setResponse(result);


        } catch (err) {
            setError(err);

        } finally {
            setLoading(false);

        }
    };



    useEffect(() => {
        fetchAPI(`${BASE_URL}/api/galleries`)
            .then(data => {
                console.log("All Galleries:", data);
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }, []);
    fetch(`${BASE_URL}/api/galleries`)
        .then(res => res.json())
        .then(data => console.log(data.data[0].categories[0].items[0].title))
        .catch(err => console.error(err));
    return (

        <div style={{ padding: '30px', fontFamily: 'system-ui, -apple-system, sans-serif', maxWidth: '900px', margin: '0 auto', background: '#f9f9f9', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
            <h2 style={{ textAlign: 'center', color: '#333' }}>Backend API Tester ⚙️</h2>
            <p style={{ textAlign: 'center', color: '#666' }}><strong>Base URL:</strong> {BASE_URL}</p>

            {/* Shortcuts Section */}
            <div style={{ marginBottom: '25px', padding: '15px', background: '#fff', borderRadius: '8px', border: '1px solid #ddd' }}>
                <h4 style={{ marginTop: 0, marginBottom: '10px', color: '#444' }}>Quick Shortcuts (from API Docs)</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {shortcuts.map((shortcut, index) => (
                        <button
                            key={index}
                            onClick={() => handleShortcutClick(shortcut.path)}
                            style={{
                                padding: '8px 12px',
                                backgroundColor: endpoint === shortcut.path ? '#007BFF' : '#e9ecef',
                                color: endpoint === shortcut.path ? 'white' : '#333',
                                border: '1px solid #ccc',
                                borderRadius: '20px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                transition: '0.2s'
                            }}
                        >
                            {shortcut.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Request Builder Section */}
            <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                <div style={{ flex: '1' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Method:</label>
                    <select value={method} onChange={(e) => setMethod(e.target.value)} style={{ padding: '10px', width: '100%', borderRadius: '6px', border: '1px solid #ccc' }}>
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                        <option value="PATCH">PATCH</option>
                        <option value="DELETE">DELETE</option>
                    </select>
                </div>

                <div style={{ flex: '4' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Endpoint / URL:</label>
                    <input
                        type="text"
                        value={endpoint}
                        onChange={(e) => setEndpoint(e.target.value)}
                        style={{ padding: '10px', width: '100%', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid #ccc' }}
                        placeholder="/api/galleries"
                    />
                </div>
            </div>

            {['POST', 'PUT', 'PATCH'].includes(method) && (
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>JSON Body:</label>
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        rows={6}
                        style={{ padding: '10px', width: '100%', boxSizing: 'border-box', fontFamily: 'monospace', borderRadius: '6px', border: '1px solid #ccc' }}
                    />
                </div>
            )}

            <button
                onClick={handleTest}
                disabled={loading}
                style={{
                    padding: '12px 24px',
                    backgroundColor: loading ? '#ccc' : '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    width: '100%',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    transition: '0.3s'
                }}
            >
                {loading ? 'Sending Request... ⏳' : 'Send Request 🚀'}
            </button>

            {/* Response Area */}
            {error && (
                <div style={{ marginTop: '25px', padding: '15px', backgroundColor: '#f8d7da', color: '#721c24', borderRadius: '8px', border: '1px solid #f5c6cb' }}>
                    <h3 style={{ marginTop: 0 }}>❌ Error</h3>
                    <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', margin: 0 }}>
                        {typeof error === 'string' ? error : JSON.stringify(error, null, 2)}
                    </pre>
                </div>
            )}

            {response && (
                <div style={{ marginTop: '25px', padding: '15px', backgroundColor: '#d4edda', color: '#155724', borderRadius: '8px', border: '1px solid #c3e6cb' }}>
                    <h3 style={{ marginTop: 0 }}>✅ Response</h3>
                    <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', maxHeight: '500px', overflowY: 'auto', margin: 0, padding: '15px', backgroundColor: '#fff', borderRadius: '6px', border: '1px solid #ccc' }}>
                        {JSON.stringify(response, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
}