interface RAGDiagramProps {
  darkMode: boolean;
}

export default function RAGDiagram({ darkMode }: RAGDiagramProps) {
  const stroke = darkMode ? '#475569' : '#cbd5e1';
  const fill = darkMode ? 'rgba(255,255,255,0.03)' : '#ffffff';
  const text = darkMode ? '#e2e8f0' : '#334155';
  const subtext = darkMode ? '#94a3b8' : '#64748b';
  const accent = darkMode ? '#a78bfa' : '#f97316';
  const accentSoft = darkMode ? 'rgba(167, 139, 250, 0.12)' : 'rgba(249, 115, 22, 0.08)';

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox="0 0 760 280"
        className="w-full h-auto min-w-[640px]"
        role="img"
        aria-label="RAG architecture: client request flows through embedding, vector search, context assembly, and LLM completion to produce a grounded answer with sources."
      >
        <defs>
          <marker id="rag-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={stroke} />
          </marker>
          <linearGradient id="rag-faiss" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={darkMode ? '#7c3aed' : '#f97316'} />
            <stop offset="100%" stopColor={darkMode ? '#ec4899' : '#f43f5e'} />
          </linearGradient>
        </defs>

        {/* Box: Client */}
        <Box x={20} y={110} w={120} label="Client" sub="POST /ask" stroke={stroke} fill={fill} text={text} subtext={subtext} />

        {/* Arrow */}
        <Arrow x1={140} y1={140} x2={180} y2={140} stroke={stroke} />

        {/* Box: FastAPI */}
        <Box
          x={180}
          y={110}
          w={140}
          label="FastAPI service"
          sub="/ask handler"
          stroke={stroke}
          fill={fill}
          text={text}
          subtext={subtext}
        />

        {/* Arrow split — to embedder (top) and to LLM (bottom via context) */}
        <Arrow x1={320} y1={130} x2={380} y2={50} stroke={stroke} curved />
        <Arrow x1={320} y1={150} x2={380} y2={235} stroke={stroke} curved />

        {/* Box: Embedder (top) */}
        <Box
          x={380}
          y={20}
          w={170}
          label="Embedder"
          sub="sentence-transformers"
          stroke={stroke}
          fill={fill}
          text={text}
          subtext={subtext}
        />

        {/* Arrow Embedder → FAISS */}
        <Arrow x1={465} y1={70} x2={465} y2={110} stroke={stroke} />

        {/* Box: FAISS — accent */}
        <g>
          <rect
            x={380}
            y={110}
            width={170}
            height={60}
            rx={10}
            fill={accentSoft}
            stroke={accent}
            strokeWidth={1.5}
          />
          <text x={465} y={135} textAnchor="middle" fontSize="13" fontWeight="600" fill={text}>
            FAISS index
          </text>
          <text x={465} y={152} textAnchor="middle" fontSize="11" fill={subtext} fontFamily="ui-monospace, monospace">
            top-k retrieval
          </text>
        </g>

        {/* Arrow FAISS → Context */}
        <Arrow x1={465} y1={170} x2={465} y2={205} stroke={stroke} />

        {/* Box: Context assembly */}
        <Box
          x={380}
          y={205}
          w={170}
          label="Context assembly"
          sub="re-rank + truncate"
          stroke={stroke}
          fill={fill}
          text={text}
          subtext={subtext}
        />

        {/* Arrow Context → LLM */}
        <Arrow x1={550} y1={235} x2={605} y2={150} stroke={stroke} curved />

        {/* Box: LLM */}
        <Box
          x={605}
          y={110}
          w={135}
          label="LLM"
          sub="completion"
          stroke={stroke}
          fill={fill}
          text={text}
          subtext={subtext}
        />

        {/* Response back to client */}
        <path
          d="M 605 140 Q 540 90 200 90 Q 80 90 80 110"
          fill="none"
          stroke={accent}
          strokeWidth={1.5}
          strokeDasharray="4 4"
          markerEnd="url(#rag-arrow)"
        />
        <text x={400} y={82} textAnchor="middle" fontSize="11" fill={accent} fontFamily="ui-monospace, monospace">
          {'{ answer, sources[], confidence }'}
        </text>
      </svg>
    </div>
  );
}

function Box({
  x,
  y,
  w,
  label,
  sub,
  stroke,
  fill,
  text,
  subtext,
}: {
  x: number;
  y: number;
  w: number;
  label: string;
  sub: string;
  stroke: string;
  fill: string;
  text: string;
  subtext: string;
}) {
  const h = 60;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} fill={fill} stroke={stroke} strokeWidth={1.2} />
      <text x={x + w / 2} y={y + h / 2 - 3} textAnchor="middle" fontSize="13" fontWeight="600" fill={text}>
        {label}
      </text>
      <text x={x + w / 2} y={y + h / 2 + 14} textAnchor="middle" fontSize="11" fill={subtext} fontFamily="ui-monospace, monospace">
        {sub}
      </text>
    </g>
  );
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  stroke,
  curved = false,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  stroke: string;
  curved?: boolean;
}) {
  const d = curved
    ? `M ${x1} ${y1} Q ${(x1 + x2) / 2} ${y1}, ${x2} ${y2}`
    : `M ${x1} ${y1} L ${x2} ${y2}`;
  return <path d={d} fill="none" stroke={stroke} strokeWidth={1.2} markerEnd="url(#rag-arrow)" />;
}
