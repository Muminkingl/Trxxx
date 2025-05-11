'use client';

import { useState } from 'react';

export default function Home() {
  const [domain, setDomain] = useState('subgasha.edu.iq');

  return (
    <div className="min-h-screen flex flex-col items-start py-8 px-8 bg-black text-white">
      <h1 className="text-2xl font-bold mb-4 text-pink-400">🔍 Subdomain Enumeration</h1>
      
      <div className="w-full max-w-md mb-6">
        <div className="flex">
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="Enter a domain"
            className="flex-grow px-4 py-2 rounded-l border border-pink-400 bg-black text-white focus:outline-none"
          />
          <button 
            className="bg-pink-400 px-4 py-2 rounded-r text-black font-medium"
            onClick={() => setDomain(domain)}
          >
            Update Commands
          </button>
        </div>
      </div>
      
      <div className="w-full border-t border-b border-pink-400/30 my-4"></div>
      
      <div className="grid grid-cols-3 gap-6 w-full mt-6">
        {/* Basic Subdomain Discovery */}
        <div className="border border-green-500/50 rounded-md p-4 bg-black/40">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-green-400">Basic Subdomain Discovery</h2>
            <span className="text-pink-400">📋</span>
          </div>
          
          <p className="text-gray-300 text-sm mb-6">
            Discovers subdomains using subfinder with recursive enumeration and saves results to a file.
          </p>
          
          <div className="bg-black rounded-md p-3 font-mono text-xs">
            <p className="text-green-400">$ <span className="text-white">subfinder -d {domain} -all -recursive &gt; {domain}.txt</span></p>
          </div>
        </div>
        
        {/* Live Subdomain Filtering */}
        <div className="border border-green-500/50 rounded-md p-4 bg-black/40">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-green-400">Live Subdomain Filtering</h2>
            <span className="text-pink-400">📋</span>
          </div>
          
          <p className="text-gray-300 text-sm mb-6">
            Filters discovered subdomains using httpx and saves the alive ones to a file.
          </p>
          
          <div className="bg-black rounded-md p-3 font-mono text-xs">
            <p className="text-green-400">$ <span className="text-white">cat {domain}.txt | httpx-toolkit -ports 80,443,8080,8000,8888 -threads 200 &gt; {domain}_alive.txt</span></p>
          </div>
        </div>
        
        {/* Subdomain Takeover Check */}
        <div className="border border-green-500/50 rounded-md p-4 bg-black/40">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-green-400">Subdomain Takeover Check</h2>
            <span className="text-pink-400">📋</span>
          </div>
          
          <p className="text-gray-300 text-sm mb-6">
            Checks for subdomain takeover vulnerabilities using subzy.
          </p>
          
          <div className="bg-black rounded-md p-3 font-mono text-xs">
            <p className="text-green-400">$ <span className="text-white">subzy run --targets {domain}_alive.txt --concurrency 100 --hide_fails --verify_ssl</span></p>
          </div>
        </div>
      </div>

      <h1 className="text-2xl font-bold mt-12 mb-4 text-pink-400">🔗 URL Collection</h1>
      
      <div className="w-full border-t border-b border-pink-400/30 my-4"></div>
      
      <div className="grid grid-cols-3 gap-6 w-full mt-6">
        {/* Passive URL Collection */}
        <div className="border border-green-500/50 rounded-md p-4 bg-black/40">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-green-400">Passive URL Collection</h2>
            <span className="text-pink-400">📋</span>
          </div>
          
          <p className="text-gray-300 text-sm mb-6">
            Collects URLs from various sources and saves them to a file.
          </p>
          
          <div className="bg-black rounded-md p-3 font-mono text-xs">
            <p className="text-green-400">$ <span className="text-white">katana -u {domain}_alive.txt -d 5 -ps -pss waybackarchive,commoncrawl,alienvault -kf -jc -fx -ef woff,css,png,svg,jpg,woff2,jpeg,gif,svg -o {domain}_allurls.txt</span></p>
          </div>
        </div>
        
        {/* Advanced URL Fetching */}
        <div className="border border-green-500/50 rounded-md p-4 bg-black/40">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-green-400">Advanced URL Fetching</h2>
            <span className="text-pink-400">📋</span>
          </div>
          
          <p className="text-gray-300 text-sm mb-6">
            Collects URLs from various sources and saves them to a file.
          </p>
          
          <div className="bg-black rounded-md p-3 font-mono text-xs">
            <p className="text-green-400">$ <span className="text-white">echo {domain} | katana -d 5 -ps -pss waybackarchive,commoncrawl,alienvault -f qurl | urldedupe &gt; {domain}_output.txt</span></p>
            <p className="text-green-400">$ <span className="text-white">katana -u https://{domain} -d 5 | grep '=' | urldedupe | anew {domain}_output.txt</span></p>
            <p className="text-green-400">$ <span className="text-white">cat {domain}_output.txt | sed 's/=.*/=/' &gt; {domain}_final.txt</span></p>
          </div>
        </div>
        
        {/* GAU URL Collection */}
        <div className="border border-green-500/50 rounded-md p-4 bg-black/40">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-green-400">GAU URL Collection</h2>
            <span className="text-pink-400">📋</span>
          </div>
          
          <p className="text-gray-300 text-sm mb-6">
            Collects URLs using GAU and saves them to a file.
          </p>
          
          <div className="bg-black rounded-md p-3 font-mono text-xs">
            <p className="text-green-400">$ <span className="text-white">echo {domain} | gau --mc 200 | urldedupe &gt; {domain}_urls.txt</span></p>
            <p className="text-green-400">$ <span className="text-white">cat {domain}_urls.txt | grep -E ".php|.asp|.aspx|.jspx|.jsp" | grep '=' | sort &gt; {domain}_output.txt</span></p>
            <p className="text-green-400">$ <span className="text-white">cat {domain}_output.txt | sed 's/=.*/=/' &gt; {domain}_final.txt</span></p>
          </div>
        </div>
      </div>

      <h1 className="text-2xl font-bold mt-12 mb-4 text-pink-400">🌐 Network Scanning</h1>
      
      <div className="w-full border-t border-b border-pink-400/30 my-4"></div>
      
      <div className="grid grid-cols-2 gap-6 w-full mt-6">
        {/* NMAP Scanning */}
        <div className="border border-green-500/50 rounded-md p-4 bg-black/40">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-green-400">NMAP Full Port Scan</h2>
            <span className="text-pink-400">📋</span>
          </div>
          
          <p className="text-gray-300 text-sm mb-6">
            Run on live subdomains after filtering. Performs comprehensive port scanning with service version detection and script scanning.
          </p>
          
          <div className="bg-black rounded-md p-3 font-mono text-xs">
            <p className="text-green-400">$ <span className="text-white">nmap -p- --open -sV -sC -T4 -oN {domain}_alive_nmap.txt {domain}_alive.txt</span></p>
          </div>
        </div>
        
        {/* Masscan */}
        <div className="border border-green-500/50 rounded-md p-4 bg-black/40">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-green-400">Masscan High-Speed Scan</h2>
            <span className="text-pink-400">📋</span>
          </div>
          
          <p className="text-gray-300 text-sm mb-6">
            Run on live subdomains after filtering. Performs high-speed port scanning across all TCP ports with faster results than NMAP.
          </p>
          
          <div className="bg-black rounded-md p-3 font-mono text-xs">
            <p className="text-green-400">$ <span className="text-white">masscan -p1-65535 --rate 10000 -oL {domain}_alive_masscan.txt {domain}_alive.txt</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
