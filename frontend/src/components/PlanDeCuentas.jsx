"use client";

import { useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  Circle,
  CheckCircle2,
  XCircle,
  UserPen,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function TreeRow({ node, level, expandedNodes, onToggleExpand }) {
  const hasChildren = node.hijos && node.hijos.length > 0;
  const isExpanded = expandedNodes.has(node.id);
  const indentWidth = level * 24; // 24px per level

  return (
    <>
      <TableRow className="hover:bg-base-300 border-none">
        <TableCell className="font-medium">
          <div
            className="flex items-center"
            style={{ paddingLeft: `${indentWidth}px` }}
          >
            {hasChildren ? (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 mr-2 text-base-content"
                onClick={() => onToggleExpand(node.id)}
              >
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
            ) : (
              <div className="w-6 mr-2 flex justify-center">
                <Circle className="h-2 w-2 fill-muted-foreground text-muted-foreground" />
              </div>
            )}
            <span className="font-mono text-base-content text-sm">
              {node.codigo}
            </span>
          </div>
        </TableCell>
        <TableCell>
          <span
            className={
              hasChildren
                ? "font-semibold text-base-content/70"
                : "text-base-content/70"
            }
          >
            {node.nombre}
          </span>
        </TableCell>
        <TableCell>
          <Badge
            variant={node.imputable ? "default" : "secondary"}
            className="text-base-content bg-base-300"
          >
            {node.imputable ? "Imputable" : "No Imputable"}
          </Badge>
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            {node.activa ? (
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            ) : (
              <XCircle className="h-4 w-4 text-red-600" />
            )}
            <span className="text-sm text-base-content">
              {node.activa ? "Activa" : "Inactiva"}
            </span>
          </div>
        </TableCell>
        <TableCell>
          <Badge variant="outline" className="text-base-content">
            {node.tipo}
          </Badge>
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            {node.recibeSaldo ? (
              <CheckCircle2 className="h-4 w-4 text-blue-600" />
            ) : (
              <XCircle className="h-4 w-4 text-gray-400" />
            )}
            <span className="text-sm text-base-content">
              {node.recibeSaldo ? "Sí" : "No"}
            </span>
          </div>
        </TableCell>
        <TableCell className="text-sm text-base-content">
          {new Date(node.createdAt).toLocaleDateString("es-ES")}
        </TableCell>
        <TableCell>
          <div className="flex flex-row">
            <span className="border-1 rounded-md border-transparent hover:border-base-content/70">
              <UserPen className="p-1 size-7 text-base-content" />
            </span>
            <span className="border-1 rounded-md border-transparent hover:border-base-content">
              <Trash2 className="p-1 size-7 text-base-content" />
            </span>
          </div>
        </TableCell>
      </TableRow>

      {hasChildren &&
        isExpanded &&
        node.hijos.map((child) => (
          <TreeRow
            key={child.id}
            node={child}
            level={level + 1}
            expandedNodes={expandedNodes}
            onToggleExpand={onToggleExpand}
          />
        ))}
    </>
  );
}

export function TreeTable({ data }) {
  const [expandedNodes, setExpandedNodes] = useState(new Set([1])); // Expand root by default

  const toggleExpand = (id) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedNodes(newExpanded);
  };

  const expandAll = () => {
    const allIds = new Set();

    const collectIds = (nodes) => {
      nodes.forEach((node) => {
        allIds.add(node.id);
        if (node.hijos && node.hijos.length > 0) {
          collectIds(node.hijos);
        }
      });
    };

    collectIds(data);
    setExpandedNodes(allIds);
  };

  const collapseAll = () => {
    setExpandedNodes(new Set());
  };

  return (
    <div className="space-y-4 mt-3 w-full ">
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="bg-base-content  text-base-300 cursor-pointer"
          onClick={expandAll}
        >
          Expandir Todo
        </Button>
        <Button
          variant="inline"
          className="bg-base-content text-base-300 cursor-pointer"
          size="sm"
          onClick={collapseAll}
        >
          Colapsar Todo
        </Button>
      </div>

      <div className="border border-base-content/5 rounded-lg overflow-hidden">
        <Table className="">
          <TableHeader>
            <TableRow className="hover:bg-base-300 border-none">
              <TableHead className="w-[200px] text-base-content/70">
                Código
              </TableHead>
              <TableHead className="text-base-content/70">Nombre</TableHead>
              <TableHead className="w-[120px] text-base-content/70">
                Imputable
              </TableHead>
              <TableHead className="w-[100px] text-base-content/70">
                Estado
              </TableHead>
              <TableHead className="w-[100px] text-base-content/70">
                Tipo
              </TableHead>
              <TableHead className="w-[120px] text-base-content/70">
                Recibe Saldo
              </TableHead>
              <TableHead className="w-[120px] text-base-content/70">
                Fecha Creación
              </TableHead>
              <TableHead className="w-[120px] text-base-content/70">
                Acciones
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((node) => (
              <TreeRow
                key={node.id}
                node={node}
                level={0}
                expandedNodes={expandedNodes}
                onToggleExpand={toggleExpand}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
