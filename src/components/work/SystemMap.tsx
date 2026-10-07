import type { SystemLayer } from "@/data/projects"

/** Layered view of a system, top (closest to the user) to bottom. Drawn from data, not a screenshot. */
export function SystemMap({ layers, title }: { layers: SystemLayer[]; title: string }) {
  return (
    <figure className="system-map">
      <ol>
        {layers.map((layer) => (
          <li key={layer.layer} className="system-layer">
            <p className="system-layer-name">{layer.layer}</p>
            <ul>
              {layer.nodes.map((node) => (
                <li key={node.name} className="system-node">
                  <strong>{node.name}</strong>
                  {node.detail && <span>{node.detail}</span>}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
      <figcaption>System overview of {title}, from the edge down to data and operations.</figcaption>
    </figure>
  )
}
