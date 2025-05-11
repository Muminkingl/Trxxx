import { NextRequest, NextResponse } from 'next/server';
import { 
  enumerateSubdomains, 
  checkLiveSubdomains, 
  checkSubdomainTakeover,
  SubdomainResult
} from '@/app/services/subdomainService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { domain, action } = body;
    
    if (!domain) {
      return NextResponse.json({ error: 'Domain is required' }, { status: 400 });
    }
    
    let results: string[] = [];
    let subdomainResults: SubdomainResult[] = [];
    
    switch (action) {
      case 'enumeration':
        subdomainResults = await enumerateSubdomains(domain);
        results = subdomainResults.map(r => r.subdomain);
        break;
      
      case 'filtering':
        subdomainResults = await checkLiveSubdomains(domain);
        results = subdomainResults.map(r => `${r.subdomain} - ${r.status}`);
        break;
      
      case 'takeover':
        subdomainResults = await checkSubdomainTakeover(domain);
        results = subdomainResults.map(r => `${r.subdomain} - ${r.vulnerability}`);
        break;
      
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
    
    return NextResponse.json({ results });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 